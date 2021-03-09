---
title: FiddlerCore Session flags
description: FiddlerCore provides set of specific flags to control the processing of the Session object
slug: fiddler-core-session-flags
tags: fiddler-core-session-flags
published: True
position: 60
---


# Session Flags


A field in each **Session** object contains flags that control the processing of the session. The flags can be accessed by **oSession.oFlags["flagname"]** or by using the default indexer on the **Session** object: **oSession["flagname"]**.

## Using SessionFlags

- Flag names are not case-sensitive.  
- Flag values are always strings.
- If you examine **oFlags["non-existent-flag"]**, the result will be **null**.
- The **oFlags** collection is the "indexer" for the **Session** object, so **oSession.oFlags["flagname"]** can be written as:
  - **oSession["flagname"]** or 
  - **oSession["SESSION", "flagname"]**
- You can remove a flag from the list by:
  - Calling: **oFlags.Remove("flagname")** or 
  - Setting **oSession["flagname"] = null**
- The value of most flags is not important; simply adding the flag is enough.  So **oSession["ui-hide"]="no"** does the same thing as **oSession["ui-hide"] = "true"** (hides the session).
- While you can call **oFlags.Add("flagname")**, this will throw an exception if the flag already exists.  It's better to just set the value: **oFlags["flagname"] = "value";**
- You can create new flags that attach metadata to a given session. To avoid naming conflicts, it's recommended that you choose distinctive flagnames. For example: **addon.acme.loggingFlag**.



## Host Flags

- **x-overrideHost** - Provide the _Host:Port_ combination, which should be used for DNS resolution purposes. Note that this mechanism does not change the HOST header on the request and thus is not useful if there's an upstream gateway.
- **x-hostIP** - Indicates the IP address of the server used for this request. **Read-only** flag.
- **x-overrideGateway** - Provide the Host:Port combination of a gateway that should be used to proxy this request, or DIRECT to send the request directly to the origin server.


## Client Flags

- **x-ProcessInfo** - Information (module name and ProcessID) on source of local requests.
- **x-clientIP** - Indicates the client IP that sent this request.  It is most useful when multiple computers on a network are pointed to a single Fiddler instance. **Read-only** flag.
- **x-clientport** - Indicates the port on the client that sent this request. **Read-only** flag.
- **x-ConnectResponseRemoveConnectionClose** - Use during the **FiddlerApplication.RequestHeadersAvailable** or **FiddlerApplication.BeforeRequest** event, so that when FiddlerCore responds to the client's CONNECT request with **_"200 Connection established"_**, it will not add the **_"Connection: close"_** header. This header is known to be controversial for the CONNECT response, and it causes problems with some clients.


## Socket Reuse Flags

- **x-serversocket** - String containing data about the reuse status of the server socket. **Read-only** flag.
- **x-securepipe** - String containing data about the reuse status of a secure server socket. **Read-only** flag.


## Decryption and Authentication Flags

- **x-no-decrypt** - If set on a CONNECT tunnel, the traffic in the tunnel will not be decrypted.
- **https-Client-Certificate** - Filename of client certificate (e.g. .CER) that should be attached to this secure request.
- **x-OverrideCertCN** - String specifying the hostname that should appear in the CN field of this CONNECT tunnel's Fiddler-generated certificate.
- **x-SuppressProxySupportHeader** - Prevent FiddlerCore from adding a "Proxy-Support: Session-Based-Authentication" header to HTTP/401 or HTTP/407 responses that request Negotiate or NTLM authentication.


## Performance Flags

- **request-trickle delay** - Milliseconds to delay each outbound kilobyte of request data.
- **response-trickle-delay** - Milliseconds to delay each inbound kilobyte of response data.

## Drop Sessions Flags

- **log-drop-request-body** - Drop the request body from the session list after a request is sent to the server.  Helpful in reducing memory usage.
- **log-drop-response-body** - Drop the request body from the session list after a response is sent to the client. Helpful in reducing memory usage.

