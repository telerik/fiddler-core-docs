---
title: Certificate Creation in Fiddler Core and Fiddler Desktop
description: Comparing the Certificate Creation Methods used in Fiddler Core and Fiddler Desktop
type: how-to
page_title: FiddlerCore versus Fiddler Desktop Certificate Creation
slug: fiddlercore-versus-fiddler-desktop-certificate-creation
position: 
tags: Certificates, Bouncy Castle, MakeCert
ticketid: 1429862
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>4.6.20191.7809</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Telerik® FiddlerCore Embedded Engine</td>
		</tr>
	</tbody>
</table>


## Description
FiddlerCore uses different APIs for certificate creation than the Desktop Version. By default, FiddlerCore includes the CertMaker and BCMakeCert assemblies for use with the Bouncy Castle API but doesn't keep the certificate for later use.

In contrast, the Default Certificate creation in the Desktop Version uses the MakeCert.exe with the Windows Crypto API and does keep the Certificate for later use.

## Suggested Workarounds
Use the 

### Using MakeCert.dll with Application (Recommended)
In this example, the MakeCert.dll is used with the ICertificateProvider Interface to store the Certificate Information. For example, in a console application prior to setting up FiddlerCore, call the `EnsureRootCertificate` method like below.

``` csharp
	private static void EnsureRootCertificate()
	{
		string certMakerPath = Path.Combine(assemblyDirectory, "lib", "CertMaker.dll");
		FiddlerApplication.Prefs.SetStringPref("fiddler.certmaker.assembly", certMakerPath);
		CertMaker.EnsureReady();
		ICertificateProvider5 certificateProvider = (ICertificateProvider5)CertMaker.oCertProvider;

		string rootCertificatePath = Path.Combine(assemblyDirectory, "..", "..", "RootCertificate.p12");
		string rootCertificatePassword = "S0m3T0pS3cr3tP4ssw0rd";

		if (File.Exists(rootCertificatePath))
		{
			certificateProvider.ReadRootCertificateAndPrivateKeyFromPkcs12File(rootCertificatePath, rootCertificatePassword);
		}
		else
		{
			certificateProvider.CreateRootCertificate();
			certificateProvider.WriteRootCertificateAndPrivateKeyToPkcs12File(rootCertificatePath, rootCertificatePassword);
		}

		if (!CertMaker.rootCertIsTrusted())
		{
			CertMaker.trustRootCert();
		}
	}

	private static void Main()
	{
		AttachEventListeners();

		EnsureRootCertificate();

		SetSAZProvider();

		StartupFiddlerCore();

		SetAllConnectionsProxySettingsToFiddlerCoreListenHostAndPort();

		ExecuteUserCommands();

		ResetAllConnectionsProxySettings();

		Quit();
	}	
```

### Store Certificate Keys in Application Settings
This method was identified by Rick Strahl's blog post titled [Using FiddlerCore to Capture Http Requests with .NET](https://weblog.west-wind.com/posts/2014/jul/29/using-fiddlercore-to-capture-http-requests-with-net)

Using Rick Strahl's cache-aware approach, when installing or uninstalling the certificate, handle the logic to cache the cert and keys. See the below code snippet from Rick Strahl's blog post.

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

	//	Example of Capturing in WinForms using FiddlerCore
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