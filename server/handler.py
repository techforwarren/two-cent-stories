import json
from databases import ES_DB  # TODO fix import highlighting


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
        "body": json.dumps([{
            "people": submissions, # TODO remove people after frontend migrates
            "submissions": submissions,
            "total_debt": total_debt,
        }])
    }


def post_submission(event, context):
    print(event)
    # TODO check something in the cookie perhaps

    return {
        "statusCode": 200
    }