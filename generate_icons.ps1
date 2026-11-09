Add-Type -AssemblyName System.Drawing

function Create-CrypticIcon {
    param([string]$path, [string]$type)
    $bmp = New-Object System.Drawing.Bitmap 320, 320
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $penWhite = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 255, 255)), 4
    $penThin = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(180, 180, 180)), 2
    $brushWhite = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255))

    switch ($type) {
        'intro' {
            $pts = @(
                New-Object System.Drawing.Point 160, 40
                New-Object System.Drawing.Point 40, 260
                New-Object System.Drawing.Point 280, 260
            )
            $g.DrawPolygon($penWhite, $pts)
            $g.DrawEllipse($penThin, 110, 140, 100, 70)
            $g.FillEllipse($brushWhite, 145, 160, 30, 30)
            $g.DrawEllipse($penThin, 70, 70, 180, 180)
        }
        'coro1' {
            $g.DrawEllipse($penWhite, 60, 60, 200, 200)
            $g.DrawEllipse($penThin, 90, 90, 140, 140)
            $g.FillEllipse($brushWhite, 148, 148, 24, 24)
            $g.DrawLine($penThin, 160, 25, 160, 60)
            $g.DrawLine($penThin, 160, 260, 160, 295)
            $g.DrawLine($penThin, 25, 160, 60, 160)
            $g.DrawLine($penThin, 260, 160, 295, 160)
        }
        'coro2' {
            $g.DrawRectangle($penWhite, 70, 70, 180, 180)
            $pts = @(
                New-Object System.Drawing.Point 160, 40
                New-Object System.Drawing.Point 280, 160
                New-Object System.Drawing.Point 160, 280
                New-Object System.Drawing.Point 40, 160
            )
            $g.DrawPolygon($penThin, $pts)
            $g.DrawEllipse($penWhite, 120, 120, 80, 80)
            $g.FillEllipse($brushWhite, 150, 150, 20, 20)
        }
        'coro3' {
            $pts1 = @(
                New-Object System.Drawing.Point 160, 275
                New-Object System.Drawing.Point 45, 75
                New-Object System.Drawing.Point 275, 75
            )
            $g.DrawPolygon($penWhite, $pts1)
            $pts2 = @(
                New-Object System.Drawing.Point 160, 45
                New-Object System.Drawing.Point 45, 245
                New-Object System.Drawing.Point 275, 245
            )
            $g.DrawPolygon($penThin, $pts2)
            $g.DrawEllipse($penWhite, 125, 125, 70, 70)
            $g.FillEllipse($brushWhite, 152, 152, 16, 16)
        }
        'logo' {
            $g.DrawEllipse($penThin, 60, 60, 200, 200)
            $g.DrawLine($penWhite, 35, 160, 285, 160)
            $g.DrawLine($penThin, 160, 35, 160, 285)
            $g.DrawRectangle($penThin, 110, 110, 100, 100)
        }
    }
    
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $g.Dispose()
}

$dir = 'C:\Users\HP\.gemini\antigravity\scratch\los-tres-coros'
Create-CrypticIcon "$dir\iconoprincipal.png" 'intro'
Create-CrypticIcon "$dir\coro1.png" 'coro1'
Create-CrypticIcon "$dir\coro2.png" 'coro2'
Create-CrypticIcon "$dir\coro3.png" 'coro3'
Create-CrypticIcon "$dir\logo.png" 'logo'
Write-Output 'Placeholder icons generated successfully.'
