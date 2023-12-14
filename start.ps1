# 连接模拟器
adb connect localhost:5555

# 创建一个新的PowerShell进程
$NewPowerShell = New-Object -ComObject "Shell.Application"

# 获取父终端的当前工作目录
$ParentWorkingDirectory = (Get-Location).Path

# 定义您要在新PowerShell窗口中执行的命令
$Command = "-noexit -command `"cd '$ParentWorkingDirectory';npm run start`""

# 用新PowerShell窗口启动命令
$NewPowerShell.ShellExecute("powershell", $Command, "", "runas", 1)

# 启动RN
npx react-native run-android