---
title: Capture HTTP/S Traffic
description: Use FiddlerCore application events to capture and analyze HTTP and HTTPS traffic
slug: capture-https-traffic
tags: capture-https-traffic
published: True
position: 30
---

# Capture HTTP/S Traffic with FiddlerCore

This article explains how to capture HTTP/S traffic with FiddlerCore

Once FiddlerCore is [configured](slug://configuration), it starts to listen for a traffic on the background. When it captures any session, it notifies you by raising the following events:

>tip The following event handlers are invoked on session-handling **background threads**. 
>
>If you need to update a UI thread (e.g. in WPF or Windows Forms application), you may need to delegate the update logic back to the UI thread, for example by using [Dispatcher.BeginInvoke](https://docs.microsoft.com/en-us/dotnet/api/system.windows.threading.dispatcher.begininvoke) (WPF) or [Control.Invoke](https://docs.microsoft.com/en-us/dotnet/api/system.windows.forms.control.invoke) (Windows Forms).
>
>Also, if you use collections that are not thread-safe, like [`List<T>`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1), you may need to employ additional synchronization mechanisms.

## FiddlerApplication.BeforeRequest
You should use this event to act when client request is received. For example, you can modify the session flags to use specific ssl protocols.
```c#
    FiddlerApplication.BeforeRequest += session => 
    {
        session["x-OverrideSslProtocols"] = "ssl3;tls1.0;tls1.1;tls1.2";
    };
```

## FiddlerApplication.BeforeResponse

You should use this event to act when a server response is received. For example, you can decode the body.
```c#
    FiddlerApplication.BeforeResponse += session => 
    {
        session.utilDecodeResponse(); 
    };
```
## FiddlerApplication.AfterSessionComplete

You should use this event to act when a session is completed. For example, notify the user.
```c#
    FiddlerApplication.AfterSessionComplete += session => 
    {
        Console.WriteLine($"Finished session: {session.fullUrl}");
    }
```
<!-- add API reference link to fiddler.fiddlerapplication-->
>tip These are only the most commonly used handlers. For the full list of events check FiddlerApplication's API reference.

## FiddlerApplication.ClientCertificateProvider 

You can use the `ClientCertificateProvider` field to set custom client certificate for specific hosts and you don't want to implement your own custom TLS Connection provider (through the `UseClientTlsProvider()` startup method). The `ClientCertificateProvider` field is available with FiddlerCore version 6.x.x and above.


```sh
FiddlerApplication.ClientCertificateProvider = localCertificateSelectionCallback;
```

## Next Steps

- [Import/export sessions](slug:// import-export-sessions)
