import json
import datetime
from databases import ES_DB

from elasticsearch_dsl import Search, Index

# TODO set mapping for story field because it is potentially long

submissions_index = Index("submissions", using=ES_DB)

submissions_index.settings(number_of_shards=1, number_of_replicas=0)
submissions = [
    {
        "id": "0",
        "firstName": "Frankie",
        "debt": 5000,
        "story": "Frankie has a story, and you can read about that story here. Be like Frankie and share your story, too.",
    },
    {
        "id": "1",
        "firstName": "Jason",
        "debt": 150000,
        "story": "Jason has a story, and you can read about that story here. Be like Jason and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "2", "firstName": "Amy", "debt": 30000, "story": ""},
    {
        "id": "3",
        "firstName": "Jess",
        "debt": 1000,
        "story": "Jess has a story, and you can read about that story here. Be like Jess and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {
        "id": "4",
        "firstName": "Colton",
        "debt": 45000,
        "story": "Colton has a story, and you can read about that story here. Be like Colton and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {
        "id": "5",
        "firstName": "Sandra",
        "debt": 135000,
        "story": "Sandra has a story, and you can read about that story here. Be like Sandra and share your story, too.",
    },
    {"id": "6", "firstName": "Joe", "debt": 37000, "story": ""},
    {
        "id": "7",
        "firstName": "Linda",
        "debt": 123000,
        "story": "Linda has a story, and you can read about that story here.",
    },
    {
        "id": "8",
        "firstName": "Terrence",
        "debt": 52000,
        "story": "Terrance has a story, and you can read about that story here. Be like Terrance and share your story, too. It doesn't have to be a long story",
    },
    {
        "id": "9",
        "firstName": "Jane",
        "debt": 150000,
        "story": "Jane has a story, and you can read about that story here. Be like Jane and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you. It can even be very long. It can include adventures and lack of adventures and a trip around the world. And lots, of, commas. Why not!!",
    },
    {"id": "10", "firstName": "Nora", "debt": 507793, "story": ""},
    {
        "id": "11",
        "firstName": "Wallace",
        "debt": 13000,
        "story": "Wallace has a story, and you can read about that story here. Be like Wallace and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "12", "firstName": "Amber", "debt": 296746, "story": ""},
    {
        "id": "13",
        "firstName": "Jenelle",
        "debt": 100560,
        "story": "Jenelle has a story, and you can read about that story here. Be like Jenelle and share your story, too. It doesn't have to be a long story",
    },
    {
        "id": "14",
        "firstName": "Emmerson",
        "debt": 100003,
        "story": "Emerson has a story, and you can read about that story here. Be like Emerson and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you. It can even be very long. It can include adventures and lack of adventures and a trip around the world. And lots, of, commas. Why not!!",
    },
    {
        "id": "15",
        "firstName": "Mindy",
        "debt": 70581,
        "story": "Mindy has a story, and you can read about that story here.",
    },
    {"id": "16", "firstName": "Dion", "debt": 994290, "story": ""},
    {"id": "17", "firstName": "Linnaea", "debt": 94493, "story": ""},
    {"id": "18", "firstName": "Sherry", "debt": 338987, "story": ""},
    {"id": "19", "firstName": "Anthony", "debt": 7436, "story": ""},
    {"id": "20", "firstName": "Jonelle", "debt": 26104, "story": ""},
    {"id": "21", "firstName": "Jess", "debt": 68796, "story": ""},
    {
        "id": "22",
        "firstName": "Gladwin",
        "debt": 36899,
        "story": "Gladwin has a story, and you can read about that story here. Be like Gladwin and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you. It can even be very long. It can include adventures and lack of adventures and a trip around the world. And lots, of, commas. Why not!!",
    },
    {"id": "23", "firstName": "Ginnie", "debt": 46260, "story": ""},
    {
        "id": "24",
        "firstName": "Celinda",
        "debt": 84046,
        "story": "Celinda has a story, and you can read about that story here. Be like Celinda and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you. It can have ups and downs and all arounds. It can talk about debt and school and other things. Maybe jobs.",
    },
    {
        "id": "25",
        "firstName": "Kate",
        "debt": 1759,
        "story": "Kate has a story, and you can read about that story here. Be like Kate and share your story, too.",
    },
    {"id": "26", "firstName": "Ron", "debt": 16278, "story": ""},
    {
        "id": "27",
        "firstName": "Ember",
        "debt": 54719,
        "story": "Ember has a story, and you can read about that story here. Be like Ember and share your story, too.",
    },
    {
        "id": "28",
        "firstName": "Tatianna",
        "debt": 26902,
        "story": "Tatianna has a story, and you can read about that story here. Be like Tatianna and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you. It can even be very long. It can include adventures and lack of adventures and a trip around the world. And lots, of, commas. Why not!!",
    },
    {"id": "29", "firstName": "Giselle", "debt": 55871, "story": ""},
    {
        "id": "30",
        "firstName": "Laurence",
        "debt": 25735,
        "story": "Laurence has a story, and you can read about that story here. Be like Laurence and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you. It can even be very long. It can include adventures and lack of adventures and a trip around the world. And lots, of, commas. Why not!!",
    },
    {"id": "31", "firstName": "Ashley", "debt": 12796, "story": ""},
    {
        "id": "32",
        "firstName": "Steve",
        "debt": 36899,
        "story": "Steve has a story, and you can read about that story here. Be like Steve and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "33", "firstName": "Albert", "debt": 22260, "story": ""},
    {
        "id": "34",
        "firstName": "Ry",
        "debt": 84054,
        "story": "Ry has a story, and you can read about that story here. Be like Ry and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {
        "id": "35",
        "firstName": "Katlyn",
        "debt": 24539,
        "story": "Katlyn has a story, and you can read about that story here. Be like Katlyn and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "36", "firstName": "Robert", "debt": 16278, "story": ""},
    {
        "id": "37",
        "firstName": "Chase",
        "debt": 13259,
        "story": "Chase has a story, and you can read about that story here. Be like Chase and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {
        "id": "38",
        "firstName": "Tristin",
        "debt": 69032,
        "story": "Tristin has a story, and you can read about that story here. Be like Tristin and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "39", "firstName": "Sam", "debt": 5171, "story": ""},
    {
        "id": "40",
        "firstName": "Chad",
        "debt": 5000,
        "story": "Chad has a story, and you can read about that story here. Be like Chad and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {
        "id": "41",
        "firstName": "August",
        "debt": 150000,
        "story": "August has a story, and you can read about that story here. Be like August and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "42", "firstName": "Ben", "debt": 30000, "story": ""},
    {
        "id": "43",
        "firstName": "Lyndi",
        "debt": 1000,
        "story": "Lyndi has a story, and you can read about that story here. Be like Lyndi and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "44", "firstName": "Chantelle", "debt": 45000, "story": ""},
    {"id": "45", "firstName": "Michael", "debt": 135000, "story": ""},
    {"id": "46", "firstName": "Sheree", "debt": 37000, "story": ""},
    {"id": "47", "firstName": "Janice", "debt": 123000, "story": ""},
    {"id": "48", "firstName": "Vere", "debt": 52000, "story": ""},
    {
        "id": "49",
        "firstName": "Nita",
        "debt": 150000,
        "story": "Nita has a story, and you can read about that story here. Be like Nita and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "50", "firstName": "Annabeth", "debt": 507793, "story": ""},
    {"id": "51", "firstName": "Jaylah", "debt": 150000, "story": ""},
    {"id": "52", "firstName": "Ricky", "debt": 30000, "story": ""},
    {
        "id": "53",
        "firstName": "Everly",
        "debt": 1000,
        "story": "Everly has a story, and you can read about that story here. Be like Everly and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {
        "id": "54",
        "firstName": "Digby",
        "debt": 45000,
        "story": "Digby has a story, and you can read about that story here. Be like Digby and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "55", "firstName": "Jen", "debt": 135000, "story": ""},
    {"id": "56", "firstName": "Finn", "debt": 37000, "story": ""},
    {
        "id": "57",
        "firstName": "Isiah",
        "debt": 123000,
        "story": "Isiah has a story, and you can read about that story here. Be like Isiah and share your story, too. It doesn't have to be a long story, but it can be a long story it's up to you.",
    },
    {"id": "58", "firstName": "Byron", "debt": 52000, "story": ""},
    {"id": "59", "firstName": "Claribel", "debt": 150000, "story": ""},
    {
        "id": "60",
        "firstName": "Ryan",
        "debt": 507792,
        "story": "asdf",
        "email": "ryan.jones@gmail.com",
        "email_clean": "ryanjones@gmail.com",
        "token_delete": "del21",
    },
    {
        "id": "61",
        "firstName": "BRYAN",
        "debt": 507793,
        "story": "asdasdf",
        "verified": False,
        "token_verify": "ver21",
    },
    {
        "id": "62",
        "firstName": "BPB",
        "debt": 507793,
        "story": "asssasdf",
        "verified": False,
        "token_verify": "ver31",
    },
]


def load_data(event, context):
    submissions_index.create(ignore=400)

    for submission in submissions:
        print("Adding submission:", submission)

        record = {
            "firstName": submission["firstName"],
            "debt": submission["debt"],
            "id": submission["id"],
            "story": submission["story"],
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


def delete_data(event, context):
    submissions_index.delete()
