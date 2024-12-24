---
title: Release History
description: FiddlerCore versions release hostory
slug: fc-release-history
publish: true
position: 300
---

# Release History

## v6.0.0 FiddlerCore

#### Breaking Changes

- Dropped support for .NET Framework.
- Deprecated `OptimizeThreadPool` configuration option.
- The `SendBodyAsync` method in `ClientChatter` now returns an integer that represents the size of the data being transferred.
- The `SendDataAsync` method in `PipeBase` now returns an integer that represents the size of the data being transferred
- The `SendRequestHeadersAsync` in `PipeBase` now returns an integer that represents the size of the data being transferred
- The `SendResponseHeadersAsync` in `PipeBase` now returns an integer that represents the size of the data being transferred
- The `SessionTimers` class has been renamed to `SessionMetrics`.
- The `Timers` field in `Session` has been renamed to `Metrics`.

#### Improvements

- Added support for TLS 1.3
- Support for HTTP/2 thorugh the `EnableHTTP2` configuration option.
- Support for adding custom TLS provider through the `UseClientTlsProvider` configuration option.
- The `SessionMetrics` has additional information for different timings and sizes throughout the session lifecycle.
- The SAZ archive now contains additional information for timings and sizes.

## v5.0.2 FiddlerCore

#### Improvements

- Add digital signature to the FiddlerCore NuGet package and the FiddlerCore assemblies.

## v5.0.1 FiddlerCore

#### Features

- Add x-`ConnectResponseRemoveConnectionClose` session flag (documented in the [Client flags]({%slug fiddler-core-session-flags%}#client-flags) section).

## v5.0.0 FiddlerCore

#### Fixed bugs

- SSL handshake fails for some servers with TLS1.2

#### Improvements

- Removal of makecert.exe from FiddlerCore distributions
- Improved the NetworkConnections API
- Included PDBs for the NetworkConnections assemblies in the distributions
- Hook using PAC script only
- Updated FiddlerCore EULA
- Updated FiddlerCore demo project
