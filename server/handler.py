import json
from databases import ES_DB  # TODO fix import highlighting
import datetime
import secrets

CORS_HEADERS = {
        # TODO check request against a list of URLs and return one if it matches
      'Access-Control-Allow-Origin': 'https://techforwarren.github.io/',
      'Access-Control-Allow-Credentials': True
    }

def get_submissions(event, context):
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
    return parts[0].replace(".", "").replace("+", "") + "@" + parts[1]


def create_submission_record(submission):
    return {
        'name': submission["name"],
        'firstName': submission["name"].split(" ")[0],
        'debt': submission["debt"],
        'story': submission["story"],
        'email': submission["email"],
        'email_clean': clean_email(submission["email"]),
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


def post_submission(event, context):
    print(event)
    # TODO check something in the cookie to help defeat trolls

    submission = json.loads(event["body"])
    record = create_submission_record(submission)
    response = ES_DB.index(index='submissions', body=record)

    print(response)

    # TODO send an email!

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