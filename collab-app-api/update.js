import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "projects",

        Key: {
            userid: event.requestContext.identity.cognitoIdentityId,
            projectid: event.pathParameters.id
        },
        UpdateExpression: "SET project_type = :project_type, description = :description, skills = :skills,  attachment = :attachment",
        ExpressionAttributeValues: {
            ":project_type": data.project_type || null,
            ":description": data.description || null,
            ":skills": data.skills || null,
            ":attachment": data.attachment || null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}
