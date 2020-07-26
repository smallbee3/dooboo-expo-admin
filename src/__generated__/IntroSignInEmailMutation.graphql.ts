/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type IntroSignInEmailMutationVariables = {
    email: string;
    password: string;
};
export type IntroSignInEmailMutationResponse = {
    readonly signInEmail: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly verified: boolean | null;
        };
    };
};
export type IntroSignInEmailMutation = {
    readonly response: IntroSignInEmailMutationResponse;
    readonly variables: IntroSignInEmailMutationVariables;
};



/*
mutation IntroSignInEmailMutation(
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
    "name": "email",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password",
    "type": "String!"
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
    "name": "IntroSignInEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IntroSignInEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "IntroSignInEmailMutation",
    "operationKind": "mutation",
    "text": "mutation IntroSignInEmailMutation(\n  $email: String!\n  $password: String!\n) {\n  signInEmail(email: $email, password: $password) {\n    token\n    user {\n      id\n      email\n      verified\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7ad420ade4e65bfb944d50d721f58fe4';
export default node;
