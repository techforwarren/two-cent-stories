import json
import datetime
from databases import ES_DB

from elasticsearch_dsl import Search, Index

# TODO set mapping for story field because it is potentially long

submissions_index = Index("submissions", using=ES_DB)

submissions_index.settings(number_of_shards=1, number_of_replicas=0)
submissions = [
    {"id": "0", "firstName": "Frankie", "debt": 5000,},
    {"id": "1", "firstName": "Jason", "debt": 150000,},
    {
        "id": "2",
        "firstName": "Amy",
        "debt": 30000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "3", "firstName": "Jess", "debt": 1000,},
    {"id": "4", "firstName": "Colton", "debt": 45000,},
    {"id": "5", "firstName": "Sandra", "debt": 135000,},
    {
        "id": "6",
        "firstName": "Joe",
        "debt": 37000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "7", "firstName": "Linda", "debt": 123000,},
    {"id": "8", "firstName": "Terrence", "debt": 52000,},
    {"id": "9", "firstName": "Jane", "debt": 75000,},
    {
        "id": "10",
        "firstName": "Nora",
        "debt": 507793,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "11", "firstName": "Wallace", "debt": 13000,},
    {
        "id": "12",
        "firstName": "Amber",
        "debt": 296746,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "13", "firstName": "Jenelle", "debt": 100560,},
    {"id": "14", "firstName": "Emmerson", "debt": 100003,},
    {"id": "15", "firstName": "Mindy", "debt": 70581,},
    {
        "id": "16",
        "firstName": "Dion",
        "debt": 94290,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "17",
        "firstName": "Linnaea",
        "debt": 94493,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "18",
        "firstName": "Sherry",
        "debt": 33897,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "19",
        "firstName": "Anthony",
        "debt": 7436,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "20",
        "firstName": "Jonelle",
        "debt": 26104,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "21",
        "firstName": "Jess",
        "debt": 68796,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "22", "firstName": "Gladwin", "debt": 36899,},
    {
        "id": "23",
        "firstName": "Ginnie",
        "debt": 46260,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "24", "firstName": "Celinda", "debt": 84046,},
    {"id": "25", "firstName": "Kate", "debt": 1759,},
    {
        "id": "26",
        "firstName": "Ron",
        "debt": 16278,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "27", "firstName": "Ember", "debt": 54719,},
    {"id": "28", "firstName": "Tatianna", "debt": 26902,},
    {
        "id": "29",
        "firstName": "Giselle",
        "debt": 55871,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "30", "firstName": "Laurence", "debt": 25735,},
    {
        "id": "31",
        "firstName": "Ashley",
        "debt": 12796,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "32", "firstName": "Steve", "debt": 36899,},
    {
        "id": "33",
        "firstName": "Albert",
        "debt": 22260,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "34", "firstName": "Ry", "debt": 84054,},
    {"id": "35", "firstName": "Katlyn", "debt": 24539,},
    {
        "id": "36",
        "firstName": "Robert",
        "debt": 16278,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "37", "firstName": "Chase", "debt": 13259,},
    {"id": "38", "firstName": "Tristin", "debt": 69032,},
    {
        "id": "39",
        "firstName": "Sam",
        "debt": 5171,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "40", "firstName": "Chad", "debt": 5000,},
    {"id": "41", "firstName": "August", "debt": 112000,},
    {
        "id": "42",
        "firstName": "Ben",
        "debt": 30000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "43", "firstName": "Lyndi", "debt": 1000,},
    {
        "id": "44",
        "firstName": "Chantelle",
        "debt": 45000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "45",
        "firstName": "Michael",
        "debt": 135000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "46",
        "firstName": "Sheree",
        "debt": 37000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "47",
        "firstName": "Janice",
        "debt": 123000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "48",
        "firstName": "Vere",
        "debt": 52000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "49", "firstName": "Nita", "debt": 110000,},
    {
        "id": "50",
        "firstName": "Annabeth",
        "debt": 50793,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "51",
        "firstName": "Jaylah",
        "debt": 120000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "52",
        "firstName": "Ricky",
        "debt": 30000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "53", "firstName": "Everly", "debt": 1000,},
    {"id": "54", "firstName": "Digby", "debt": 45000,},
    {
        "id": "55",
        "firstName": "Jen",
        "debt": 135000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "56",
        "firstName": "Finn",
        "debt": 37000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {"id": "57", "firstName": "Isiah", "debt": 123000,},
    {
        "id": "58",
        "firstName": "Byron",
        "debt": 52000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "59",
        "firstName": "Claribel",
        "debt": 15000,
        "story": "While this story is a placeholder, we'd love it if you shared your own story here!",
    },
    {
        "id": "60",
        "firstName": "Ryan",
        "debt": 50772,
        "email": "ryan.jones@gmail.com",
        "email_clean": "ryanjones@gmail.com",
        "token_delete": "del21",
    },
    {
        "id": "61",
        "firstName": "BRYAN",
        "debt": 40793,
        "verified": False,
        "token_verify": "ver21",
    },
    {
        "id": "62",
        "firstName": "BPB",
        "debt": 30743,
        "verified": False,
        "token_verify": "ver31",
    },
]


def load_data(event, context):
    submissions_index.create(ignore=400)

    for submission in submissions:
        print("Adding submission:", submission)

        record = {
            "firstName": submission["firstName"] + "*",
            "debt": submission["debt"],
            "id": submission["id"],
            "story": submission.get("story", ""),
            "createdDate": datetime.datetime.now().isoformat(),
            "verifiedDate": datetime.datetime.now().isoformat()
            if submission.get("verified") is not False
            else None,
            "tokenVerify": submission.get("token_verify"),
            "tokenDelete": submission.get("token_delete"),
        }

        ES_DB.index(index="submissions", id=submission["id"], body=record)


def list_data(event, context):
    results = ES_DB.search(
        index="submissions",
        body={"sort": [{"verifiedDate": {"order": "desc"}}], "size": 200},
    )

    submissions = [submission["_source"] for submission in results["hits"]["hits"]]

    return {"statusCode": 200, "body": json.dumps([{"submissions": submissions,}])}


def delete_sample_data(event, context):
    for i in range(70):
        print("deleting submission:", i)
        ES_DB.delete(index="submissions", id=i, ignore=404)


def delete_all_data(event, context):
    submissions_index.delete()
