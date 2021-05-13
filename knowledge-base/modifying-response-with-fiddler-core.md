---
title: Modifying a response with FiddlerCore
description: 
type: how-to
page_title: Modifying Response
slug: modifying-response-fcore
ticketid: 1516567
res_type: kb
---

#### Environment

|   |   |
|---|---|
| Product  | FiddlerCore  |
| Product Version | 5.0.1 |


#### Description

# Modifying a Response with FiddlerCore

To modify an HTTP response, ensure the session is set to **buffered mode**. 

Use some of the early events of the response, for example, the `ResponseHeadersAvailable` to access the session object and set the `bBufferResponse` property to `true`. If the property is not set to `true`, in the `BeforeResponse` event, you'll receive a **copy** of the response, while it will be streamed to the client as well. So your modifications will not be applied to the response that the client will receive.

```CSharp
private static void FiddlerApplication_ResponseHeadersAvailable(Session oSession)
{

    if (oSession.fullUrl.Contains("example.com"))
    {
        // Set this to true, so in BeforeResponse, you'll be able to modify the body.
        // If the value is false (default one), the response you'll work with within the BeforeResponse handler will be just a copy. 
        // The original one will already be streamed to the client, and all of your modifications will not be visible there.
        oSession.bBufferResponse = true;
    }
}
```

Then you can handle the `BeforeResponse` event and modify the session's response as per your requirements.

```CSharp
private static void FiddlerApplication_BeforeResponse(Session oSession)
{
    if (oSession.fullUrl.Contains("example.com") && oSession.HTTPMethodIs("GET"))
    {
        oSession.bBufferResponse = true;
        oSession.utilDecodeResponse();

        // Remove any compression or chunking
        oSession.utilDecodeResponse();
        var oBody = System.Text.Encoding.UTF8.GetString(oSession.responseBodyBytes);
        // Modify the body as you want
        oBody = "Replaced body";

        // Set the response body to the div-less string
        oSession.utilSetResponseBody(oBody);
    }
}
```
