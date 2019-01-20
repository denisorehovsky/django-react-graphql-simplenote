export type Maybe<T> = T | null;

export interface NoteInputType {
  title?: Maybe<string>;

  body?: Maybe<string>;
}

/** The `DateTime` scalar type represents a DateTime value as specified by [iso8601](https://en.wikipedia.org/wiki/ISO_8601). */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export namespace NotesQuery {
  export type Variables = {
    search?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    notes: Maybe<Notes>;
  };

  export type Notes = {
    __typename?: "NoteTypeConnection";

    edges: (Maybe<Edges>)[];
  };

  export type Edges = {
    __typename?: "NoteTypeEdge";

    node: Maybe<Node>;
  };

  export type Node = {
    __typename?: "NoteType";

    id: string;

    title: string;

    body: string;
  };
}

export namespace NoteCreateMutation {
  export type Variables = {
    input: NoteInputType;
  };

  export type Mutation = {
    __typename?: "Mutation";

    noteCreate: Maybe<NoteCreate>;
  };

  export type NoteCreate = {
    __typename?: "NoteCreate";

    note: Maybe<Note>;
  };

  export type Note = {
    __typename?: "NoteType";

    id: string;
  };
}

export namespace NoteDeleteMutation {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    noteDelete: Maybe<NoteDelete>;
  };

  export type NoteDelete = {
    __typename?: "NoteDelete";

    ok: Maybe<boolean>;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace NotesQuery {
  export const Document = gql`
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
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace NoteCreateMutation {
  export const Document = gql`
    mutation NoteCreateMutation($input: NoteInputType!) {
      noteCreate(input: $input) {
        note {
          id
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace NoteDeleteMutation {
  export const Document = gql`
    mutation NoteDeleteMutation($id: ID!) {
      noteDelete(id: $id) {
        ok
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
