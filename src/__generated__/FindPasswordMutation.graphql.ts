/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type FindPasswordMutationVariables = {
    email: string;
};
export type FindPasswordMutationResponse = {
    readonly findPassword: boolean;
};
export type FindPasswordMutation = {
    readonly response: FindPasswordMutationResponse;
    readonly variables: FindPasswordMutationVariables;
};



/*
mutation FindPasswordMutation(
  $email: String!
) {
  findPassword(email: $email)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email",
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
      }
    ],
    "kind": "ScalarField",
    "name": "findPassword",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FindPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FindPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FindPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation FindPasswordMutation(\n  $email: String!\n) {\n  findPassword(email: $email)\n}\n"
  }
};
})();
(node as any).hash = '055fc9987a34d04355a924d1fae5811a';
export default node;
