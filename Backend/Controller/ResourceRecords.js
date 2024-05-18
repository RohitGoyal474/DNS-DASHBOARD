import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import "dotenv/config";
import {
  Route53Client,
  ChangeResourceRecordSetsCommand,
  ListResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";

const client = new Route53Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

const CreateResourceRecord = asyncHandler(async (req, res) => {
  const { id, description, name, type, ttl, value } = req.body;
  console.log("req.body", req.body);
  console.log("test1-----");
  // Check if all required fields are present in the request body
  if (!id || !name || !type  || !value) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  console.log("test2-----")
  // Construct input for the ChangeResourceRecordSetsCommand
  const input = {
    HostedZoneId: id,
    ChangeBatch: {
      Comment: description || "", // Default to an empty string if description is not provided
      Changes: [
        {
          Action: "CREATE",
          ResourceRecordSet: {
            Name: name,
            Type: type,
            TTL: ttl,
            ResourceRecords: [{ Value: value }],
          },
        },
      ],
    },
  };

  try {
    // Send the command to create the resource record
    const response = await client.send(
      new ChangeResourceRecordSetsCommand(input)
    );

    return res.status(201).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error creating resource record:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});


const ListResourceRecords = asyncHandler(async (req, res) => {
  const { Id } = req.query;
  let records = [];
  let isTruncated = true;
  let nextRecordName;
  let nextRecordType;

  while (isTruncated) {
    const inputs = {
      HostedZoneId: Id,
      StartRecordName: nextRecordName,
      StartRecordType: nextRecordType,
    };

    try {
      const data = await client.send(new ListResourceRecordSetsCommand(inputs));
      records = records.concat(data.ResourceRecordSets);

      isTruncated = data.IsTruncated;
      if (isTruncated) {
        nextRecordName = data.NextRecordName;
        nextRecordType = data.NextRecordType;
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      throw error;
    }
  }
  return res.status(200).json({
    success: true,
    data: records,
  });
});


const deleteResourceRecord = asyncHandler(async (req, res) => {
  const { Id, RecordName, RecordType, RecordValues, TTL } = req.body;

  // Prepare the record to be deleted
  const recordSet = {
    Name: RecordName,
    Type: RecordType,
    TTL: TTL,
    ResourceRecords: RecordValues.map((value) => ({ Value: value })),
  };

  // Prepare the input for the delete operation
  const input = {
    HostedZoneId: Id,
    ChangeBatch: {
      Changes: [
        {
          Action: "DELETE",
          ResourceRecordSet: recordSet,
        },
      ],
    },
  };

  try {
    
    const data = await client.send(new ChangeResourceRecordSetsCommand(input));
    return res.status(200).json({
      success: true,
      message: "Record set deleted successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error deleting record set:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete record set",
      error: error.message,
    });
  }
});

const UpdateResourceRecord = asyncHandler(async (req, res) => {
  const { id, description, name, type, ttl, value } = req.body;
  console.log("req.body", req.body);
  console.log("test1-----");

  // Check if all required fields are present in the request body
  if (!id || !name || !type || !value) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  console.log("test2-----");

  // Construct input for the ChangeResourceRecordSetsCommand
  const input = {
    HostedZoneId: id,
    ChangeBatch: {
      Comment: description || "", // Default to an empty string if description is not provided
      Changes: [
        {
          Action: "UPSERT", // Use UPSERT action for updating
          ResourceRecordSet: {
            Name: name,
            Type: type,
            TTL: ttl,
            ResourceRecords: [{ Value: value }],
          },
        },
      ],
    },
  };

  try {
    // Send the command to update the resource record
    const response = await client.send(
      new ChangeResourceRecordSetsCommand(input)
    );

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error updating resource record:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export {
  CreateResourceRecord,
  ListResourceRecords,
  deleteResourceRecord,
  UpdateResourceRecord,
};