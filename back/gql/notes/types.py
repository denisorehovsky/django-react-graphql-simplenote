from graphene_django import DjangoObjectType
from notes.models import Note


class NoteType(DjangoObjectType):

    class Meta:
        model = Note
        only_fields = (
            'id',
            'title',
            'body',
            'created_at',
        )
        use_connection = True
