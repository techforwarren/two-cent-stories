import json
from databases import ES_DB  # TODO fix import highlighting
import datetime
import secrets
import boto3
from os import path

# TODO make configurable
HOST = "https://tpkfcvx8jf.execute-api.us-east-1.amazonaws.com" + "/" + "dev"

CORS_HEADERS = {
    # TODO check request against a list of URLs and return one if it matches
    'Access-Control-Allow-Origin': 'https://techforwarren.github.io',
    'Access-Control-Allow-Credentials': True
}


def get_submissions(event, context):
    # TODO "include" parameter
    # Comma separated list of specific submission ids to include
    # Max length 3
    results = ES_DB.search(index="submissions", body={
        "query": {"exists": {"field": "verifiedDate"}},
        "_source": ["firstName", "debt", "story", "id", "verifiedDate"],
        "sort": [
            {"verifiedDate": {"order": "desc"}}
        ],
        "aggs": {
            "total_debt": {"sum": {"field": "debt"}}
        },
        "size": 200
    })

    total_debt = results["aggregations"]["total_debt"]["value"]

    submissions = [submission["_source"] for submission in results["hits"]["hits"]]

    # TODO set something in the cookie perhaps to indicate when they got to page

    return {
        "statusCode": 200,
        "headers": {
            **CORS_HEADERS
        },
        "body": json.dumps([{
            "submissions": submissions,
            "total_debt": total_debt,
        }])
    }


def clean_email(email):
    parts = email.lower().split("@")
    return parts[0].replace(".", "").split("+")[0] + "@" + parts[1]


def create_submission_record(submission):
    return {
        'name': submission["name"],
        'firstName': submission["name"].split(" ")[0],
        'debt': submission["debt"],
        'story': submission["story"],
        'email': submission["email"],
        'emailClean': clean_email(submission["email"]),
        "createdDate": datetime.datetime.now().isoformat(),
        "tokenVerify": secrets.token_urlsafe(16).replace("-", ""),
        "tokenDelete": secrets.token_urlsafe(16).replace("-", ""),
    }


def mark_verified(submission):
    return {
        **submission,
        "tokenVerify": None,
        "verifiedDate": datetime.datetime.now().isoformat(),
    }


def send_email(submission_record, submission_id):
    client = boto3.client('ses')

    verify_url = path.join(HOST, f"submissions/{submission_id}/verify") + f"?token={submission_record['tokenVerify']}"
    delete_url = path.join(HOST, f"submissions/{submission_id}/delete") + f"?token={submission_record['tokenDelete']}"
    email_body = f"<a target='_blank' href='{verify_url}'>Verify Your Story</a>" \
                 f"<br>" \
                 f"<br>" \
                 f"<a target='_blank' href='{delete_url}'>Delete Your Story</a>"

    print(email_body)
    response = client.send_email(
        Source='noreply@twocentstories.com', # TODO make this not no-reply?
        Destination={
            'ToAddresses': [
                # submission_record["email"],
                "success@simulator.amazonses.com"
                # "bounce@simulator.amazonses.com"
            ]
        },
        Message={
            'Subject': {
                'Data': 'Confirm Your Story'
            },
            'Body': {
                # 'Text': {
                #     'Data': f'string'
                # },
                'Html': {
                    'Data': email_body
                }
            }
        },
        ReturnPath='complaints@twocentstories.com',
        # SourceArn='string',
        # ReturnPathArn='string',
        # ConfigurationSetName='string'
    )
def post_submission(event, context):
    print(event)
    # TODO check something in the cookie to help defeat trolls

    submission = json.loads(event["body"])
    record = create_submission_record(submission)

    # TODO check that there isn't already a story from this email address
    response = ES_DB.index(index='submissions', body=record)

    send_email(record, response["_id"])

    return {
        "statusCode": 200,
        "headers": {
            **CORS_HEADERS
        },
        "body": json.dumps({
            "id": response["_id"]
        })
    }


def post_verified_submission(event, context):
    submission = json.loads(event["body"])
    record = create_submission_record(submission)
    verified_record = mark_verified(record)
    response = ES_DB.index(index='submissions', body=verified_record)

    return {
        "statusCode": 200,
        "headers": {
            **CORS_HEADERS
        },
        "body": json.dumps({
            "id": response["_id"]
        })
    }


def verify_submission(event, context):
    submission_id = event["pathParameters"]["submissionId"]
    if not submission_id:
        return {
            "statusCode": 400,
            "headers": {
                **CORS_HEADERS
            },
            "body": "Submission id missing"
        }
    token = event.get("queryStringParameters", {}).get("token")
    if not token:
        return {
            "statusCode": 400,
            "headers": {
                **CORS_HEADERS
            },
            "body": "Token missing"
        }

    submission = ES_DB.get(index="submissions", id=submission_id)

    if not submission:
        return {
            "statusCode": 404,
            "headers": {
                **CORS_HEADERS
            }
        }

    verify_token = submission["_source"]["tokenVerify"]

    if not verify_token:
        return {
            "statusCode": 200,
            "headers": {
                **CORS_HEADERS
            },
            "body": "Your story has already been verified! Thank you :)"
        }

    if token != verify_token:
        return {
            "statusCode": 403,
            "headers": {
                **CORS_HEADERS
            },
            "body": f"Token: {token} did not match"
        }

    # mark story is verified
    ES_DB.update(index='submissions', id=submission_id,
                 body={"doc": {"tokenVerify": None,
                               "verifiedDate": datetime.datetime.now().isoformat()}})

    return {
        "statusCode": 200,
        "headers": {
            **CORS_HEADERS
        },
        "body": "Your story has been verified! Thank you :)"
    }


def delete_submission(event, context):
    submission_id = event["pathParameters"]["submissionId"]
    if not submission_id:
        return {
            "statusCode": 400,
            "headers": {
                **CORS_HEADERS
            },
            "body": "Submission id missing"
        }
    token = event.get("queryStringParameters", {}).get("token")
    if not token:
        return {
            "statusCode": 400,
            "headers": {
                **CORS_HEADERS
            },
            "body": "Token missing"
        }

    submission = ES_DB.get(index="submissions", id=submission_id)

    if not submission:
        return {
            "statusCode": 404,
            "headers": {
                **CORS_HEADERS
            }
        }

    delete_token = submission["_source"]["tokenDelete"]

    if not delete_token:
        return {
            "statusCode": 200,
            "headers": {
                **CORS_HEADERS
            },
            "body": "Your story has already been deleted! Thank you :)"
        }

    if token != delete_token:
        return {
            "statusCode": 403,
            "headers": {
                **CORS_HEADERS
            },
            "body": f"Token: {token} did not match"
        }

    ES_DB.delete(index='submissions', id=submission_id)

    return {
        "statusCode": 200,
        "headers": {
            **CORS_HEADERS
        },
        "body": "Your story has been deleted!"
    }

