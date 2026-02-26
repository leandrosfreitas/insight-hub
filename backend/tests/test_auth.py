def test_login_invalid_user(client):
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "fake@email.com",
            "password": "wrongpassword"
        }
    )

    assert response.status_code == 401
