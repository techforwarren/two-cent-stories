import pytest

import handler


class TestMisc:
    @pytest.mark.parametrize(
        "email, expected",
        [
            ("test@example.com", "test@example.com"),
            ("test+bees@example.com", "test@example.com"),
            ("te.st@example.com", "test@example.com"),
            ("te.st+be.es@example.com", "test@example.com"),
        ],
    )
    def test_clean_email(self, email, expected):
        assert expected == handler.clean_email(email)

    def test_get_api_url(self):
        event = {
            "requestContext": {
                "resourceId": "wba04f",
                "resourcePath": "/submissions",
                "httpMethod": "GET",
                "extendedRequestId": "F6XibG74oAMF9Dg=",
                "requestTime": "07/Jan/2020:04:16:15 +0000",
                "path": "/dev/submissions",
                "accountId": "330381130059",
                "protocol": "HTTP/1.1",
                "stage": "dev",
                "domainPrefix": "tpkfcvx8jf",
                "requestTimeEpoch": 1578370575405,
                "requestId": "d1bf99c1-f19a-4d9b-8d42-e6ce6a1cf074",
                "identity": {},
                "domainName": "tpkfcvx8jf.execute-api.us-east-1.amazonaws.com",
                "apiId": "tpkfcvx8jf",
            }
        }

        assert (
            "https://tpkfcvx8jf.execute-api.us-east-1.amazonaws.com/dev"
            == handler.get_api_url(event)
        )
