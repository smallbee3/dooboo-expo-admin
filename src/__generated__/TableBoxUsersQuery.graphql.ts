/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TableBoxUsersQueryVariables = {
    size: number;
    buttonNum: number;
    currentPage?: number | null;
    cursor?: string | null;
};
export type TableBoxUsersQueryResponse = {
    readonly users: {
        readonly pageEdges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly name: string | null;
                readonly email: string | null;
                readonly nickname: string | null;
                readonly gender: unknown | null;
                readonly phone: string | null;
                readonly verified: boolean | null;
                readonly lastSignedIn: unknown | null;
                readonly createdAt: unknown | null;
                readonly deletedAt: unknown | null;
            } | null;
        }> | null;
        readonly pageCursors: {
            readonly first: {
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            } | null;
            readonly previous: {
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            } | null;
            readonly around: ReadonlyArray<{
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            }> | null;
            readonly next: {
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            } | null;
            readonly last: {
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            } | null;
        } | null;
    } | null;
};
export type TableBoxUsersQuery = {
    readonly response: TableBoxUsersQueryResponse;
    readonly variables: TableBoxUsersQueryVariables;
};



/*
query TableBoxUsersQuery(
  $size: Int!
  $buttonNum: Int!
  $currentPage: Int
  $cursor: String
) {
  users(size: $size, buttonNum: $buttonNum, currentPage: $currentPage, cursor: $cursor) {
    pageEdges {
      cursor
      node {
        name
        email
        nickname
        gender
        phone
        verified
        lastSignedIn
        createdAt
        deletedAt
      }
    }
    pageCursors {
      first {
        cursor
        page
        isCurrent
      }
      previous {
        cursor
        page
        isCurrent
      }
      around {
        cursor
        page
        isCurrent
      }
      next {
        cursor
        page
        isCurrent
      }
      last {
        cursor
        page
        isCurrent
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "buttonNum"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "currentPage"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "size"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "page",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "buttonNum",
        "variableName": "buttonNum"
      },
      {
        "kind": "Variable",
        "name": "currentPage",
        "variableName": "currentPage"
      },
      {
        "kind": "Variable",
        "name": "cursor",
        "variableName": "cursor"
      },
      {
        "kind": "Variable",
        "name": "size",
        "variableName": "size"
      }
    ],
    "concreteType": "paginationUserConnection",
    "kind": "LinkedField",
    "name": "users",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "pageEdgesUserConnection",
        "kind": "LinkedField",
        "name": "pageEdges",
        "plural": true,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nickname",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "gender",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "phone",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "verified",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastSignedIn",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "deletedAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "pageCursorsUserConnection",
        "kind": "LinkedField",
        "name": "pageCursors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "cursorUserConnection",
            "kind": "LinkedField",
            "name": "first",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "cursorUserConnection",
            "kind": "LinkedField",
            "name": "previous",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "cursorUserConnection",
            "kind": "LinkedField",
            "name": "around",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "cursorUserConnection",
            "kind": "LinkedField",
            "name": "next",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "cursorUserConnection",
            "kind": "LinkedField",
            "name": "last",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TableBoxUsersQuery",
    "selections": (v6/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "TableBoxUsersQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "a3727a80350f3967c28ba2665f248bab",
    "id": null,
    "metadata": {},
    "name": "TableBoxUsersQuery",
    "operationKind": "query",
    "text": "query TableBoxUsersQuery(\n  $size: Int!\n  $buttonNum: Int!\n  $currentPage: Int\n  $cursor: String\n) {\n  users(size: $size, buttonNum: $buttonNum, currentPage: $currentPage, cursor: $cursor) {\n    pageEdges {\n      cursor\n      node {\n        name\n        email\n        nickname\n        gender\n        phone\n        verified\n        lastSignedIn\n        createdAt\n        deletedAt\n      }\n    }\n    pageCursors {\n      first {\n        cursor\n        page\n        isCurrent\n      }\n      previous {\n        cursor\n        page\n        isCurrent\n      }\n      around {\n        cursor\n        page\n        isCurrent\n      }\n      next {\n        cursor\n        page\n        isCurrent\n      }\n      last {\n        cursor\n        page\n        isCurrent\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '95dd8d959377db0e9818dad40c821709';
export default node;
