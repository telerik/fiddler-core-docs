---
title: Register as System Proxy
slug: register-as-system-proxy
tags: register
published: True
position: 20
---

# Register as System Proxy

This article explains how to register FiddlerCore as system proxy. This is a common scenario, in which part or all of the system traffic is redirected to FiddlerCore, so it can capture and/or modify it &ndash; similar to what Fiddler do.

## Basic approach

The simplest way to register FiddlerCore as a system proxy is by passing `FiddlerCoreStartupSettings` on startup:
```c#
FiddlerCoreStartupSettings startupSettings =
    new FiddlerCoreStartupSettingsBuilder()
        .RegisterAsSystemProxy()
        .Build();

FiddlerApplication.Startup(startupSettings);
``` 

There are more basic methods affecting the system proxy settings in the FiddlerCoreStartupSettings. You can read more in [Configuration/Proxy settings]({%slug configuration %}#system-proxy-settings) article.

## Advanced approach
Instead of using the basic configuration methods, you can manually modify the proxy settings. The logic for modifying the system connections' proxy settings is separated in the Telerik.NetworkConnections assembly. 

It contains the following key members:

- `INetworkConnectionsDetector`: Base interface representing network connection detector. It contains a single `Detect()` method, which should return a set of `NetworkConnection` instances of a particular type.
- `NetworkConnection`: Base abstract class which allows manipulation and monitoring of proxy settings for a specific network connection. The most important members are:
    - `GetCurrentProxySettings()`: Returns the current `ProxySettings` for the connection.
    - `SetProxySettings(ProxySettings)`: Sets specified proxy settings for the connection.
    - `ProxySettingsChanged`: Event raised when proxy settings for the connection are changed.

To manually manipulate network connections' proxy settings, you can use any of the built-in detectors, obtain an instance of a NetworkConnection class, and invoke it's `SetProxySettings` method, for example:
```c#
// Detect the network connections:
var networkConnections = new WinINetNetworkConnectionsDetector().Detect();

// Create appropriate proxy settings (in this case bypassing particular hosts):
var proxySettings = new ProxySettings(true, "https://www.telerik.com");

// Modify some of the network connections:
networkConnections.First().SetProxySettings(proxySettings);

// Start:
FiddlerApplication.Startup(new FiddlerCoreStartupSettingsBuilder().Build());
```

The following default implementations for `INetworkConnectionsDetector` are provided:
- `WinINetNetworkConnectionsDetector`: detector for Windows-specific Windows Internet (WinINET) networking component network connection.
- `RasNetworkConnectionsDetector`: detector for Windows-specific RAS network connections.
- `MacNetworkConnectionsDetector`: Detector for Mac-specific network connections.
- `LinuxNetworkConnectionsDetector`: Detector for Linux-specific network connections.

>noteThe built-in connection detectors are OS-specific and will throw exception if invoked on not supported platforms.

## Next Steps

- [Capture HTTP/S Traffic]({%slug capture-https-traffic %})

