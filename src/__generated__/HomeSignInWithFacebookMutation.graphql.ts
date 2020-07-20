/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type HomeSignInWithFacebookMutationVariables = {
    accessToken: string;
};
export type HomeSignInWithFacebookMutationResponse = {
    readonly signInWithFacebook: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly verified: boolean | null;
        };
    };
};
export type HomeSignInWithFacebookMutation = {
    readonly response: HomeSignInWithFacebookMutationResponse;
    readonly variables: HomeSignInWithFacebookMutationVariables;
};



/*
mutation HomeSignInWithFacebookMutation(
  $accessToken: String!
) {
  signInWithFacebook(accessToken: $accessToken) {
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
    "name": "accessToken"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accessToken",
        "variableName": "accessToken"
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "signInWithFacebook",
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
    "name": "HomeSignInWithFacebookMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeSignInWithFacebookMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "168877e4d8b5bc60fd4d2987db8b330d",
    "id": null,
    "metadata": {},
    "name": "HomeSignInWithFacebookMutation",
    "operationKind": "mutation",
    "text": "mutation HomeSignInWithFacebookMutation(\n  $accessToken: String!\n) {\n  signInWithFacebook(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      verified\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0eb0e25a35f7ab1c4a1ec17f830d863c';
export default node;
