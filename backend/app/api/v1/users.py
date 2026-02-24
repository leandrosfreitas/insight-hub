from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.repositories.user import create_user, get_user_by_id, list_users

from app.api.deps import get_current_user
from app.db.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.post(
    "",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def create(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_user(db, user)


@router.get(
    "",
    response_model=list[UserResponse]
)
def get_all(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return list_users(db)


@router.get(
    "/{user_id}",
    response_model=UserResponse
)
def get_by_id(
    user_id: int, db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
