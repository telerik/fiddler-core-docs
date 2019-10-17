---
title: System Requirements
page_title: System Requirements for using FiddlerCore Embedded Engine
slug: system-requirements
position: 1
---

# System Requirements

In order to develop applications with **Telerik UI for Xamarin** you need to have the following development tools installed:

## Windows

- Windows 8.1 or higher. You would need [Windows 10](https://www.microsoft.com/en-us/windows/get-windows-10) in order to develop for UWP.
- Visual Studio 2017 or Visual Studio 2019 with Xamarin installed. Go to [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/) page to see the available download options.

	To install Xamarin for Visual Studio 2017/ Visual Studio 2019, you would need to enable **Mobile development with .NET** workload. 
		
	* If you run a fresh installation of Visual Studio, you will be prompted to select workloads during the installation process.
	* if you already have Visual Studio installed, you could modify the active workloads by re-running the Visual Studio installer and selecting "Modify" option.
	
	#### Figure 1: VS 2017 with Mobile development with .NET workload enabled
	![](images/vs2017_xamarin_workload.png)
		
	> Before proceeding, please make sure the following Individual components are included:
	>	* Xamarin
	>	* Text Template Transformation
	>	* .NET Portable Library targeting pack

	>tip For more detailed instructions go to [Installing Xamarin in Visual Studio on Windows](https://docs.microsoft.com/en-us/xamarin/cross-platform/get-started/installation/windows) topic in Xamarin documentation.
 
- For building iOS apps - [configured iOS build host](https://developer.xamarin.com/guides/ios/getting_started/installation/windows/connecting-to-mac/).


## macOS

You will be able to develop **Android** and **iOS** apps. The **iOS** apps will require iOS 8 and higher. Windows apps are not supported on macOS.

-  [macOS Sierra 10.12 or higher](http://www.apple.com/osx/).
-  [Visual Studio for Mac](https://www.visualstudio.com/downloads/) with Xamarin installed.

	VS for Mac installer inspects your system and verifies which components are installed and which need to be updated. In order to make sure Xamarin is installed, you would need to run the VS for Mac installer and check whether **Android** and **iOS** options are enabled.
	
	#### Figure 3: VS for Mac with Android and iOS platforms enabled
	![](images/vsmac_xamarin.png)

	>tip For more information go to [Setup and Install Visual Studio for Mac](https://docs.microsoft.com/en-us/visualstudio/mac/installation) topic.

-  [XCode 8.3 or higher](https://developer.apple.com/xcode/).

## Xamarin.Forms reference

The minimum required version of **Xamarin.Forms** package is **4.1.0.581479**.

>The **Android project** requires multiple packages with specific versions. The **Xamarin.Forms** package will install most of the required packages as its dependencies. You can then go to [Required Android Support Libraries]({% slug required-android-support-libraries %}) article and check if you have all required files and versions.

## Next Steps

* [Download Product Files]({%slug download-product-files%})
* [Use Telerik NuGet Server]({%slug telerik-nuget-server%})