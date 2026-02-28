def test_create_user(client):
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "admin@email.com",
            "password": "123456"
        }
    )

    assert response.status_code == 401
