[<- api](../../../api/index.md)

# audit_scheduled_tweets

## Description

Audits Chickadee scheduled tweets.

## Synopsis

```
xln-cli api social chickadee audit_scheduled_tweets [options]
```

## Options

`--organization_id (string)`

A Xilution organization's ID. Use "MY_ORG_ID" to reference the context profile `organizationId`. Required.

`--page_number (number)`

The page number. Required.

`--page_size (number)`

The page size. Required.

`--from_timestamp (string)`

The start timestamp in ISO 8601 format. Required.

`--to_timestamp (string)`

The end timestamp in ISO 8601 format. Required.

---
Copyright 2019 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
