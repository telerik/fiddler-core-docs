---
title: Configuration
description: Learn more about FiddlerCore start-up, proxy, handling, and shutdown settings
slug: configuration
tags: configuration
published: True
position: 10
---

# Configuration

On high-level, working with FiddlerCore is done through the `FiddlerApplication` class and contains 3 steps:

1. Attach to some event handlers, which will be used by FiddlerCore to report information to the application, for example `FiddlerApplication.BeforeRequest` or `FiddlerApplication.AfterSessionComplete`.

2. Start FiddlerCore using `FiddlerApplication.Startup(FiddlerCoreStartupSettings)` method.

3. Shutdown FiddlerCore using `FiddlerApplication.Shutdown()` method.

The simplest usage is demonstrated in the following code snippet:
```c#
using System;
using Fiddler;

class Program
{
    static void Main(string[] args)
    {
        // Attach to events of interest:
        FiddlerApplication.AfterSessionComplete += session => Console.WriteLine(session.fullUrl);

        // Build startup settings:
        var settings = new FiddlerCoreStartupSettingsBuilder()
            .RegisterAsSystemProxy() // instructs FiddlerCore to act as the operating system proxy
            .Build();

        // Start:
        FiddlerApplication.Startup(settings);

        Console.ReadLine();

        // Shutdown:
        FiddlerApplication.Shutdown();
    }
}
```

## Startup configuration

To configure FiddlerCore, you can use `FiddlerCoreStartupSettingsBuilder` class, which encapsulates the logic for creating `FiddlerCoreStartupSettting` instance, which in turn can be used as an argument for `FiddlerApplication.Startup(FiddlerCoreStartupSettings)` method.

`FiddlerCoreStartupSettingsBuilder` provides fluent API, for example a convenient usage is:
```c#
FiddlerCoreStartupSettings startupSettings =
    new FiddlerCoreStartupSettingsBuilder()
        .ListenOnPort(fiddlerCoreListenPort)
        .DecryptSSL() // Capture and decrypt HTTPS, Use alongside the set certificate provider
        .RegisterAsSystemProxy()
        .EnableHTTP2() // Enable HTTP/2 support (suported in FiddlerCore version 6.x.x and above)
        .Build();

// Example for using BouncyCastle as certificate provider.
BCCertMaker.BCCertMaker certProvider = new BCCertMaker.BCCertMaker();
CertMaker.oCertProvider = certProvider;

// In case the current certificate is not already trusted, trust it, so that FiddlerCore can capture and decrypt HTTPS traffic.
if (!CertMaker.IsRootCertificateTrusted())
{
    CertMaker.TrustRootCertificate();
}

// Example for using a FiddlerApplication event 
FiddlerApplication.AfterSessionComplete += session => 
{
    Console.WriteLine($"Finished session: {session.fullUrl}");
}

FiddlerApplication.Startup(startupSettings);
```

The following configuration methods of `FiddlerCoreStartupSettingsBuilder` are available:

#### Common settings:

- `ListenOnPort(ushort port)`: Specifies the port on which FiddlerCore will listen. If 0 is used, random port is assigned.
- `AllowRemoteClients()`: Allows FiddlerCore to accept requests from outside of the current machine, e.g. remote computers and devices.

>warning Be cautious when allowing remote clients to connect to FiddlerCore. If an attacker is able to proxy its traffic through this FiddlerCore instance, it could circumvent IPSec traffic rules and intranet firewalls.

#### System proxy settings:

> There are a lot of possible systems and types of connections which might have to be modified in order to set proper proxy settings, and the following methods handle only the most common scenarios. For more advanced proxy configuration, see [Register as System Proxy]({%slug register-as-system-proxy %}) article.

- `RegisterAsSystemProxy()`: Modifies the local LAN connection's proxy settings to point to the port on which FiddlerCore is listening on localhost. 
- `MonitorAllConnections()`: Modifies all system connections' proxy settings to point to the port on which FiddlerCore is listening on localhost.
- `CaptureFTP()`: Modifies the system's proxy FTP-related settings to point to the port on which FiddlerCore is listening on localhost.
- `HookUsingPACFile()`: Modifies current proxy settings to be configured using [PAC](https://en.wikipedia.org/wiki/Proxy_auto-config) file. On the other side, FiddlerCore serves a PAC file which is used to modify the connection. The default PAC file which is served can be configured by changing the "fiddler.proxy.pacfile.text" preference, which includes the body of the PAC file's `FindProxyForURL(url, host)` function, for example:
```c#
FiddlerApplication.Prefs.SetStringPref("fiddler.proxy.pacfile.text", "return 'PROXY 127.0.0.1:8888'");
```

#### FiddlerCore proxy settings:

- `ChainToUpstreamGateway()`: Sets the current LAN connection's proxy settings as an upstream gateway proxy. For example, if the application is running in a corporate environment behind a corporate proxy, the corporate proxy will be used as an upstream gateway proxy for FiddlerCore.
>note Chaining when upstream gateway proxy settings are configured to use PAC file is supported only on Windows.
- `SetUpstreamProxySettingsTo(ProxySettings proxySettings)`: Sets the FiddlerCore upstream proxy settings as specified in the passed instance for ProxySettings class.

#### Other settings:

- `EnableHTTP2()`: Enables the support for capturing HTTP/2 traffic. Available with FiddlerCore version 6.x.x and above.
- `DecryptSSL()`:  Enables decryption of HTTPS traffic. You should have a CertificateProvider loaded with trusted certificate. For more details see [Use Custom Root Certificate]({%slug use-custom-root-certificate %}) article.
- `UseClientTlsProvider(IClientTlsConnectionProvider customClientTlsProvider)`: Sets a custom client TLS provider for Fiddler. The provider will be used to authenticate an existing connection and return a stream to read/write data from/to it. Available with FiddlerCore version 6.x.x and above.

## Handling Events

The `FiddlerApplication` class exposes numerous events like `BeforeRequest`, `BeforeResponse`, `AfterSessionComplete`, and many more. Full list of all supported events can be found in the [FiddlerCore API reference](https://docs.telerik.com/fiddlercore/api/fiddler.fiddlerapplication#events).

Learn more on how to use the FiddlerCore events in the [Capture HTTP/S Traffic]({%slug capture-https-traffic %}) article.

## Shutdown

FidlerCore can be shut down using the following method of `FiddlerApplication`
- `Shutdown()`: Shuts down FiddlerCore, and reverts the proxy settings to the original ones, in case they were modified on startup.
>note If there is traffic in progress when calling `FiddlerApplication.Shutdown()`, some of the background threads handling the sessions may throw `ObjectDisposedException` or `NullReferenceException`. 

## Next Steps

- [Register as System Proxy]({%slug register-as-system-proxy %})
- [Use Custom Root Certificate]({%slug use-custom-root-certificate %})
