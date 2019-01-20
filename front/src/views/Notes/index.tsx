import { Card, Col, Divider, Icon, Input, Row, Spin } from 'antd';
import * as queryString from 'query-string';
import * as React from 'react';
import { compose, withApollo } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import { NoteDeleteMutation, NotesQuery } from '../../generatedModels';
import CreateNoteForm from './CreateNoteForm';

interface INotesState {
    searchQuery?: string;
}

interface INotesBaseProps {
    deleteNote: NoteDeleteMutation.MutationFn;
}

type INotesProps = NotesQuery.Props<INotesBaseProps> & RouteComponentProps;

class Notes extends React.Component<INotesProps, INotesState> {
    constructor(props: INotesProps) {
        super(props);
        const query = queryString.parse(props.location.search);
        this.state = {
            searchQuery: query && query.search
                ? query.search.toString()
                : undefined
        };
    }

    public render() {
        const { searchQuery } = this.state;
        const { data } = this.props;

        return (
            <Row>
                <Col span={12} offset={6}>
                    <Divider>Create Note</Divider>
                    <CreateNoteForm
                        onSuccess={this.handleCreateNoteFormSuccess}
                    />
                    <Divider>Notes</Divider>
                    <Input.Search
                        placeholder="Search..."
                        enterButton="Search"
                        defaultValue={searchQuery}
                        onChange={this.handleSearchQueryChange}
                        onSearch={this.handleSearch}
                    />
                    {data!.loading ? (
                        <Spin style={{ marginTop: 16, display: 'block' }} />
                    ) : (
                        <div>
                            {data!.notes!.edges.map(edge => (
                                <Card
                                    key={edge!.node!.id}
                                    style={{ marginTop: 16 }}
                                    actions={[
                                        <Icon
                                            type="delete"
                                            key={edge!.node!.id}
                                            onClick={() => this.handleDeleteNote(edge!.node!.id)}
                                        />
                                    ]}
                                >
                                    <Card.Meta
                                        title={edge!.node!.title}
                                        description={edge!.node!.body}
                                    />
                                </Card>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        );
    }

    private handleSearchQueryChange = (event: any) => {
        this.setState({
            searchQuery: event.target.value || undefined
        });
    };

    private handleSearch = () => {
        const { searchQuery } = this.state;
        const { history, location } = this.props;

        history.push({
            pathname: location.pathname,
            search: queryString.stringify({
                search: searchQuery
            })
        });
    };

    private handleCreateNoteFormSuccess = () => {
        const { data } = this.props;
        return data!.refetch();
    };

    private handleDeleteNote = (id: string) => {
        const { data, deleteNote } = this.props;
        return deleteNote({ variables: { id } })
            .then(() => data!.refetch());
    };
}

export default compose(
    withApollo,
    withRouter,
    NotesQuery.HOC({
        options: (props: INotesProps) => ({
            variables: queryString.parse(props.location.search)
        })
    }),
    NoteDeleteMutation.HOC({
        props: ({ mutate }) => ({
            deleteNote: mutate
        })
    })
)(Notes);
