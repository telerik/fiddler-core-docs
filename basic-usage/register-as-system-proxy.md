---
title: Register as System Proxy
slug: register-as-system-proxy
tags: register
published: True
position: 1
---

# Register as System Proxy

This article explains how to register FiddlerCore as system proxy. This is a common scenario, in which 
part or all of the system traffic is redirected to FiddlerCore, so it can capture and/or modify it &ndash; similar 
to what Fiddler do.

## Basic approach

The simplest way to register FiddlerCore as a system proxy is by passing `FiddlerCoreStartupSettings` on startup:
```
FiddlerCoreStartupSettings startupSettings =
    new FiddlerCoreStartupSettingsBuilder()
        // The port on which FiddlerCore will listen. If 0 is used, random port is assigned.        
        .ListenOnPort(fiddlerCoreListenPort)
        // 
        .RegisterAsSystemProxy()
        .ChainToUpstreamGateway()
        .DecryptSSL()
        .Build();

FiddlerApplication.Startup(startupSettings);
``` 

## Advanced approach



## Next Steps

- [Capture HTTP/S Traffic]({%slug capture-https-traffic %})

