---
title: Configuration
slug: configuration
tags: configuration
published: True
position: 0
---

# Configuration

On high-level, working with FiddlerCore is done through the `FiddlerApplication` class and contains 3 steps:

1. Attach to some event handlers, which will be used by FiddlerCore to report information to the application, for example `FiddlerApplication.BeforeRequest` or `FiddlerApplication.AfterSessionComplete`.

2. Start FiddlerCore using `FiddlerApplication.Startup(FiddlerCoreStartupSettings)` method.

3. Shutdown FiddlerCore using `FiddlerApplication.Shutdown()` method.

## Startup configuration
To configure FiddlerCore, you can use `FiddlerCoreStartupSettingsBuilder` class, which encapsulates the logic for creating `FiddlerCoreStartupSettting` instance, which in turn can be used as an argument for `FiddlerApplication.Startup(FiddlerCoreStartupSettings)` method.

`FiddlerCoreStartupSettingsBuilder` provides fluent API, for example a convenient usage is:
```
FiddlerCoreStartupSettings startupSettings =
    new FiddlerCoreStartupSettingsBuilder()
        .ListenOnPort(fiddlerCoreListenPort)
        .RegisterAsSystemProxy()
        .Build();

FiddlerApplication.Startup(startupSettings);
```

The following configuration methods of `FiddlerCoreStartupSettingsBuilder` are available:
###### Common settings:

- `ListenOnPort(int)`: The port on which FiddlerCore will listen. If 0 is used, random port is assigned.
- `AllowRemoteClients()`: 

###### Proxy settings:
- `RegisterAsSystemProxy()`: Modifies the local LAN connection's proxy settings to point to the port on which FiddlerCore is listening on localhost. 
- `MonitorAllConnections()`: Modifies the all system connections proxy settings to point to the port on which FiddlerCore is listening on localhost.
- `ChainToUpstreamGateway()`: Sets the current proxy settings as an upstream gateway proxy settings in case FiddlerCore is registered as a system proxy. For example, if the application is running in a corporate environment behind a corporate proxy, the corporate proxy will be used as an upstream gateway proxy.
- `SetUpstreamProxySettingsTo(ProxySettings)`: Modifies the system connection(s) proxy settings as specified in the 
- `CaptureFTP()`: Modifies the system's proxy FTP-related settings to point to the port on which FiddlerCore is listening on localhost.
- `HookUsingPACFile()`: 
>tipThere are a lot of possible systems and types of connections which might have to be modified in order to set proper proxy settings, and these methods handle only the most common scenarios. For more advanced proxy configuration, see [Register as System Proxy]({%slug register-as-system-proxy %}).

###### Other settings:
- `DecryptSSL()`:  Enables decryption of HTTPS traffic. You should have a CertificateProvider loaded with trusted certificate. For more details see [Use Custom Root Certificate]({%slug use-custom-root-certificate %}) article.
- `OptimizeThreadPool()`: Optimizes the thread pool to better handle multiple simultaneous threads. This is often convenient, as each `Session` is handled in a different thread. Under the hood, this methods uses [`ThreadPool.SetMinThreads`](https://docs.microsoft.com/en-us/dotnet/api/system.threading.threadpool.setminthreads) with a value larger that the default one.

## Next Steps

- [Register as System Proxy]({%slug register-as-system-proxy %})
- [Use Custom Root Certificate]({%slug use-custom-root-certificate %})
