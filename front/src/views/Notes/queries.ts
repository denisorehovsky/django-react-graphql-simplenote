import gql from 'graphql-tag';

export const NOTES_QUERY = gql`
    query NotesQuery($search: String) {
        notes(search: $search) {
            edges {
                node {
                    id
                    title
                    body
                }
            }
        }
    }
`;

export const NOTE_CREATE_MUTATION = gql`
    mutation NoteCreateMutation($input: NoteInputType!) {
        noteCreate(input: $input) {
            note {
                id
            }
        }
    }
`;

export const NOTE_DELETE_MUTATION = gql`
    mutation NoteDeleteMutation($id: ID!) {
        noteDelete(id: $id) {
            ok
        }
    }
`;