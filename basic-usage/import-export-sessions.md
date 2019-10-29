---
title: Import and Export Sessions
slug: import-export-sessions
tags: import-export-sessions
published: True
position: 4
---

# Import and Export Sessions with FiddlerCore

This article expains how to import and export sessions with FiddlerCore.

## Import Sessions

You can import sessions with FiddlerCore by using the following code:

    Session[] loaded = Utilities.ReadSessionArchive(sazFilename, false, "", (file, part) =>
    {
        Console.WriteLine($"Enter the password for { part } (or just hit Enter to cancel):");
        string sResult = Console.ReadLine();
        Console.WriteLine();
        
        return sResult;
    });

## Export Sessions

You can export sessions with FiddlerCore by using the following code:

    bool success = Utilities.WriteSessionArchive(filename, sessions.ToArray(), password, false);

## Custom SAZ Provider

There are cases that you may want to use custom provider to save FiddlerCore sessions. You do this by setting the following property:

    FiddlerApplication.oSAZProvider = new CustomSazProvider();
