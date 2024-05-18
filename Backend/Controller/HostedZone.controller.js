import {
  Route53Client,
  ListHostedZonesCommand,
  CreateHostedZoneCommand,
  DeleteHostedZoneCommand,
} from "@aws-sdk/client-route-53";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import "dotenv/config";

const client = new Route53Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

const HostedZoneList = asyncHandler(async (req, res) => {
  const command = new ListHostedZonesCommand({});
  if (!command) {
    throw new ApiError(400, "command is not defined");
  }
  const response = await client.send(command);
  if (!response) {
    throw new ApiError(400, "response is not defined");
  }

  return res.status(200).json({
    success: true,
    data: response,
  });
});

const CreateHostedZone = asyncHandler(async (req, res) => {
  const { name, Description, zoneType } = req.body;

  if (!name || !Description) {
    throw new ApiError(400, "All fields are required");
  }
  var val=true;
  const input = {
    Name: name,
    CallerReference: `${Date.now()}`,
    HostedZoneConfig: {
      Comment: Description,
      PrivateZone: false,
    },
  };
  const command = new CreateHostedZoneCommand(input);
  const response = await client.send(command);
  res.status(201).json({
    success: true,
    data: response,
  })
});

const DeleteHostedZone = asyncHandler(async (req, res) => {

    const { Id } = req.body;
    if(!Id){
        throw new ApiError(400, "ID is required");
    }
    const input = {
      
      Id: Id, // required
    };
    const command = new DeleteHostedZoneCommand(input);
    if(!command){
        throw new ApiError(400, "command is not defined");
    }
    const response = await client.send(command);
    if(!response){
        throw new ApiError(400, "response error");
    }
    res.status(200).json({
        success: true,
        data: response
    })
})

const updateResourceRecord = asyncHandler(async (req, res) => {
  const { Id, RecordName, RecordType, RecordValues, TTL } = req.body;

  // Prepare the record to be updated
  const recordSet = {
    Name: RecordName,
    Type: RecordType,
    TTL: TTL,
    ResourceRecords: RecordValues.map((value) => ({ Value: value })),
  };

  // Prepare the input for the update operation
  const input = {
    HostedZoneId: Id,
    ChangeBatch: {
      Changes: [
        {
          Action: "UPSERT",
          ResourceRecordSet: recordSet,
        },
      ],
    },
  };

  try {
    // Send the upsert command
    const data = await client.send(new ChangeResourceRecordSetsCommand(input));
    return res.status(200).json({
      success: true,
      message: "Record set updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error updating record set:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update record set",
      error: error.message,
    });
  }
});

export { HostedZoneList, CreateHostedZone, DeleteHostedZone, updateResourceRecord };
