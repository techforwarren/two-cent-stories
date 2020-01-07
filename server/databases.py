from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import boto3
import os

client = boto3.client("es")

ES_ENDPOINT = os.environ["ES_ENDPOINT"]

if ES_ENDPOINT == "[object Object]":
    # hack to make local dev work until https://github.com/serverless/serverless/issues/7087 is closed
    ES_ENDPOINT = "search-submissions-es-dev-4ghkzjlvmufm66oxlr7yaqvnma.us-east-1.es.amazonaws.com"

credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    "us-east-1",
    "es",
    session_token=credentials.token,
)

ES_DB = Elasticsearch(
    hosts=f"https://{ES_ENDPOINT}",
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection,
)
