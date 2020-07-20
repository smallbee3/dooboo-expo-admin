/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type HomeSignInWithGoogleMutationVariables = {
    accessToken: string;
};
export type HomeSignInWithGoogleMutationResponse = {
    readonly signInWithGoogle: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly verified: boolean | null;
        };
    };
};
export type HomeSignInWithGoogleMutation = {
    readonly response: HomeSignInWithGoogleMutationResponse;
    readonly variables: HomeSignInWithGoogleMutationVariables;
};



/*
mutation HomeSignInWithGoogleMutation(
  $accessToken: String!
) {
  signInWithGoogle(accessToken: $accessToken) {
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
    "name": "signInWithGoogle",
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
    "name": "HomeSignInWithGoogleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeSignInWithGoogleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3aa401c1bd55a7a45e7f6045012ac3a8",
    "id": null,
    "metadata": {},
    "name": "HomeSignInWithGoogleMutation",
    "operationKind": "mutation",
    "text": "mutation HomeSignInWithGoogleMutation(\n  $accessToken: String!\n) {\n  signInWithGoogle(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      verified\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ae6e296f1d319ce709290f23422f2a6a';
export default node;
