from graphene import Boolean, Field, ID, InputObjectType, Mutation, String
from rest_framework import serializers
from notes.models import Note
from .types import NoteType


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = (
            'id',
            'title',
            'body',
        )


class NoteInputType(InputObjectType):
    title = String()
    body = String()


class NoteCreate(Mutation):
    class Arguments:
        input = NoteInputType(required=True)

    note = Field(NoteType)

    @classmethod
    def mutate(cls, root, info, **data):
        serializer = NoteSerializer(data=data.get('input'))
        serializer.is_valid(raise_exception=True)

        return NoteCreate(note=serializer.save())


class NoteDelete(Mutation):
    class Arguments:
        id = ID(required=True)

    ok = Boolean()

    @classmethod
    def mutate(cls, root, info, **data):
        note = Note.objects.get(id=data.get('id'))
        note.delete()

        return NoteDelete(ok=True)
