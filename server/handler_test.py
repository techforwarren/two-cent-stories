import pytest

import handler

class TestMisc:
    @pytest.mark.parametrize("email, expected", [
        ("test@example.com", "test@example.com"),
        ("test+bees@example.com", "test@example.com"),
        ("te.st@example.com", "test@example.com"),
        ("te.st+be.es@example.com", "test@example.com")
    ])
    def test_clean_email(self, email, expected):
        assert expected == handler.clean_email(email)
