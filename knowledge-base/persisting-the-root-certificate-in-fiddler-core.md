---
title: Persisting the Root Certificate in Fiddler Core
description: Article showing different methods for persisting the Certificate in Fiddler Core
type: how-to
page_title: Reusing Certificates
slug: persisting-the-root-certificate-in-fiddler-core
ticketid: 1429862
res_type: kb
---


#### Environment

|   |   |
|---|---|
| Product  | Fiddler Core  |
| Product Version | 4.6.20191.7809 |


#### Description

FiddlerCore uses different APIs for certificate creation than the Desktop Version. By default, FiddlerCore includes the CertMaker and BCMakeCert assemblies for use with the Bouncy Castle API but doesn't persist the certificate by default. The Bouncy Castle API is recommended because it can be used across multiple platforms.


## Persisting and Reusing Certificates

Since FiddlerCore is a library that can be used in other applications, the API won't force persisting the Certificate and leaves the implementation up to the developer. The following workarounds are examples that show different ways this can be achieved.

## Using MakeCert.dll with Application (Recommended)

In this example, the MakeCert.dll is used with the ICertificateProvider5 Interface to store the Certificate Information. For example, call the `EnsureRootCertificate` method like below.

``` csharp
	private static void EnsureRootCertificate()
	{
		BCCertMaker.BCCertMaker certProvider = new BCCertMaker.BCCertMaker();
		CertMaker.oCertProvider = certProvider;

		// On first run generate root certificate using the loaded provider, then re-use it for subsequent runs.
		string rootCertificatePath = Path.Combine(assemblyDirectory, "..", "..", "RootCertificate.p12");
		string rootCertificatePassword = "S0m3T0pS3cr3tP4ssw0rd";
		if (!File.Exists(rootCertificatePath))
		{
			certProvider.CreateRootCertificate();
			certProvider.WriteRootCertificateAndPrivateKeyToPkcs12File(rootCertificatePath, rootCertificatePassword);
		}
		else
		{
			certProvider.ReadRootCertificateAndPrivateKeyFromPkcs12File(rootCertificatePath, rootCertificatePassword);
		}

		if (!CertMaker.rootCertIsTrusted())
		{
			CertMaker.trustRootCert();
		}
	}
```

## Store Certificate Keys in Application Settings

This method was identified by Rick Strahl's blog post titled [Using FiddlerCore to Capture Http Requests with .NET](https://weblog.west-wind.com/posts/2014/jul/29/using-fiddlercore-to-capture-http-requests-with-net). The approach store the certificate and keys in the Application Configuration. See the below code snippet from Rick Strahl's blog post.

``` csharp
	// Installing the Certificate
	public static bool InstallCertificate()
	{
		if (!CertMaker.rootCertExists())           
		{
			if (!CertMaker.createRootCert())
				return false;

			if (!CertMaker.trustRootCert())
				return false;

			App.Configuration.UrlCapture.Cert = 
				FiddlerApplication.Prefs.GetStringPref("fiddler.certmaker.bc.cert", null);	// Set FiddlerCore BC Cert value into Application Configuration
			App.Configuration.UrlCapture.Key = 
				FiddlerApplication.Prefs.GetStringPref("fiddler.certmaker.bc.key", null);	// Set FiddlerCore BC Key value into Application Configuration
		}
		
		return true;
	}

	// Uninstalling the Certificate
	public static bool UninstallCertificate()
	{
		if (CertMaker.rootCertExists())
		{
			if (!CertMaker.removeFiddlerGeneratedCerts(true))
				return false;
		}
		App.Configuration.UrlCapture.Cert = null; 	// Clear the Cert from Application Configuration
		App.Configuration.UrlCapture.Key = null;	//	Clear the Key from Application Configuration
		return true;
	}

	public FiddlerCapture(StressTestForm form)
	{
		InitializeComponent();
		CaptureConfiguration = App.Configuration.UrlCapture;
		MainForm = form;

		if (!string.IsNullOrEmpty(App.Configuration.UrlCapture.Cert))
		{
			FiddlerApplication.Prefs.SetStringPref("fiddler.certmaker.bc.key", App.Configuration.UrlCapture.Key); // Read the Key from Application Configuration
			FiddlerApplication.Prefs.SetStringPref("fiddler.certmaker.bc.cert", App.Configuration.UrlCapture.Cert); // Read the Cert from Application Configuration
		}
	}	
```

## See Also

[Certificate Installation with Fiddler Core - Rick Strahl](https://weblog.west-wind.com/posts/2014/jul/29/using-fiddlercore-to-capture-http-requests-with-net#Certificate-Installation-with-FiddlerCore)