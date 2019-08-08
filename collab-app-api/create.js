import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "projects",
        Item: {
            userid: event.requestContext.identity.cognitoIdentityId,
            projectid: uuid.v1(),
            type: data.type,
            description: data.description,
            skills: data.skills,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}