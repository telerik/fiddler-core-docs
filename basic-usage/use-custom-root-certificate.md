---
title: Use Custom Root Certificate
slug: use-custom-root-certificate
tags: use-custom-root-certificate
published: True
position: 3
---

# Use Custom Root Certificate

This article explains how to generate and trust FiddlerCore your own root certificate.

By default, when you use the FiddlerCoreStartupSettingsBuilder.DecryptSSL() setting, FiddlerCore will create new certificate every time the application runs. This example shows how to change this behavior.

## Set the Default Certificate Provider

The following code explains how to set the default certificate provider for FiddlerCore:

    BCCertMaker.BCCertMaker certProvider = new BCCertMaker.BCCertMaker();
    CertMaker.oCertProvider = certProvider;

## Create Root Certificate

The following code explains how to create your own root certificate.

    string rootCertificatePath = @"Path\To\Your\Root\Certificate\RootCertificate.p12";
    string rootCertificatePassword = "S0m3T0pS3cr3tP4ssw0rd";
    if (!File.Exists(rootCertificatePath))
    {
        certProvider.CreateRootCertificate();
        certProvider.WriteRootCertificateAndPrivateKeyToPkcs12File(rootCertificatePath, rootCertificatePassword);
    }

## Read Root Certificate from File

The following code explains how to create your own root certificate.

    string rootCertificatePath = @"Path\To\Your\Root\Certificate\RootCertificate.p12";
    string rootCertificatePassword = "S0m3T0pS3cr3tP4ssw0rd";
    if (File.Exists(rootCertificatePath))
    {
        certProvider.ReadRootCertificateAndPrivateKeyFromPkcs12File(rootCertificatePath, rootCertificatePassword);
    }

## Trust Root Certificate

The following code explains how to trust your root certificate.

    if (!CertMaker.rootCertIsTrusted())
    {
        CertMaker.trustRootCert();
    }

## Next Steps

- [Import/export sessions]({%slug import-export-sessions%})
