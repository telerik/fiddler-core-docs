---
title: Capture HTTP/S Traffic
slug: capture-https-traffic
tags: capture-https-traffic
published: True
position: 3
---

# Capture HTTP/S Traffic with FiddlerCore

This article expains how to capture HTTP/S traffic with FiddlerCore

Once FiddlerCore is [configured]({%slug configuration %}), it starts to listen for a traffic on the background. When it captures any session, it notifies you by firing the following events:

>It is important to understand that FiddlerCore calls event handlers on session-handling background threads.

## FiddlerApplication.BeforeRequest
You should use this event to act when client request is received. For example, you can modify the session flags to use specific ssl protocols.

    Fiddler.FiddlerApplication.BeforeRequest += session => 
    {
        session["x-OverrideSslProtocols"] = "ssl3;tls1.0;tls1.1;tls1.2";
    };


## FiddlerApplication.BeforeResponse

You should use this event to act when a server responce is received. For example, you can decode the body.

    Fiddler.FiddlerApplication.BeforeResponse += session => 
    {
        session.utilDecodeResponse(); 
    };

## FiddlerApplication.AfterSessionComplete

You should use this event to act when a session is completed. For example, notify the user.

    FiddlerApplication.AfterSessionComplete += session => 
    {
        Console.WriteLine($"Finished session: {session.fullUrl}");
    }

>tip These are only the most commonly used handlers. For the full list of events check [this article](/api/fiddler.fiddlerapplication)

## Next Steps

- [Import/export sessions]({%slug import-export-sessions%})