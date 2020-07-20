/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type HomeSignInEmailMutationVariables = {
    email: string;
    password: string;
};
export type HomeSignInEmailMutationResponse = {
    readonly signInEmail: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly verified: boolean | null;
        };
    };
};
export type HomeSignInEmailMutation = {
    readonly response: HomeSignInEmailMutationResponse;
    readonly variables: HomeSignInEmailMutationVariables;
};



/*
mutation HomeSignInEmailMutation(
  $email: String!
  $password: String!
) {
  signInEmail(email: $email, password: $password) {
    token
    user {
      id
      email
      verified
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "signInEmail",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
            "name": "verified",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeSignInEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeSignInEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f0cf49b9347bfbdee5b16dcced5841b8",
    "id": null,
    "metadata": {},
    "name": "HomeSignInEmailMutation",
    "operationKind": "mutation",
    "text": "mutation HomeSignInEmailMutation(\n  $email: String!\n  $password: String!\n) {\n  signInEmail(email: $email, password: $password) {\n    token\n    user {\n      id\n      email\n      verified\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4a064325a4c7736ee6fdedca72ec56d7';
export default node;
