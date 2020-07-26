/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type IntroSignInWithGoogleMutationVariables = {
    accessToken: string;
};
export type IntroSignInWithGoogleMutationResponse = {
    readonly signInWithGoogle: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly verified: boolean | null;
        };
    };
};
export type IntroSignInWithGoogleMutation = {
    readonly response: IntroSignInWithGoogleMutationResponse;
    readonly variables: IntroSignInWithGoogleMutationVariables;
};



/*
mutation IntroSignInWithGoogleMutation(
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
    "name": "accessToken",
    "type": "String!"
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
    "name": "IntroSignInWithGoogleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IntroSignInWithGoogleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "IntroSignInWithGoogleMutation",
    "operationKind": "mutation",
    "text": "mutation IntroSignInWithGoogleMutation(\n  $accessToken: String!\n) {\n  signInWithGoogle(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      verified\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '438f82a87b142d728faa34211c4b0d02';
export default node;
