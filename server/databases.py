from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import boto3

client = boto3.client('es')

response = client.describe_elasticsearch_domain(
    DomainName='submissions-es-dev'  # TODO make an env var (or make ARN an env var and slice this off of it)
)

elasticsearch_endpoint = response["DomainStatus"]["Endpoint"] # TODO set this directly as an env var if possible

elasticsearch_url = f"https://{elasticsearch_endpoint}"

print(elasticsearch_url)

credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, "us-east-1", "es", session_token=credentials.token)

ES_DB = Elasticsearch(hosts=elasticsearch_url,
                      http_auth=awsauth,
                      use_ssl=True,
                      verify_certs=True,
                      connection_class=RequestsHttpConnection)
