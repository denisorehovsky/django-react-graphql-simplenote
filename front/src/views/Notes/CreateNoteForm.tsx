import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { compose, withApollo } from 'react-apollo';
import { NoteCreateMutation } from '../../generatedModels';

interface ICreateNoteFormState {
    noteBody: string;
    noteTitle: string;
}

interface ICreateNoteFormProps {
    createNote: NoteCreateMutation.MutationFn;
    onSuccess: () => any;
}

class CreateNoteForm extends React.Component<ICreateNoteFormProps, ICreateNoteFormState> {
    public state: ICreateNoteFormState = {
        noteBody: '',
        noteTitle: '',
    }

    public render() {
        const { noteBody, noteTitle } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    <Input
                        placeholder="Title"
                        value={noteTitle}
                        onChange={this.handleNoteTitleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Input.TextArea
                        placeholder="Body"
                        value={noteBody}
                        onChange={this.handleNoteBodyChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        );
    }

    private handleNoteTitleChange = (event: any) => {
        this.setState({ noteTitle: event.target.value });
    };

    private handleNoteBodyChange = (event: any) => {
        this.setState({ noteBody: event.target.value });
    };

    private handleSubmit = (event: any) => {
        event.preventDefault();
        const { noteBody, noteTitle } = this.state;
        const { createNote, onSuccess } = this.props;

        return createNote({ variables: { input: { title: noteTitle, body: noteBody } } })
            .then(() => {
                this.setState({ noteBody: '', noteTitle: '' });
                return onSuccess();
            });
    }
}

export default compose(
    withApollo,
    NoteCreateMutation.HOC({
        props: ({ mutate }) => ({
            createNote: mutate
        })
    }),
)(CreateNoteForm);