#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 第一行注释 告诉Linux/OS X系统，这是一个Python可执行程序
# 第二行注释 告诉Python解释器，按照UTF-8编码读取源代码

print("Hello World")
print("Hello,", "fucking bitch!")

# name = input("输入名字有惊喜!")
name = "bitch"
print("Fuck you,", name)

print('Are you \'OK\'?')

print(r'\\\t\\')

print('''line1
line2
line3''')

print(r'''hello,\n
world''')

print('True:', True)

print('False:', False)

print('3 > 2:', 3 > 2)
print('3 > 5:', 3 > 5)

print('True and False:', True and False)
print('True and True:', True and True)
print('False and False:', False and False)

print('True or False:', True or False)
print('True or True:', True or True)
print('False or False:', False or False)

print('not True:', not True)
print('not False:', not False)

age = 18
if age >= 18:
    print('adult')
else:
    print('teen')

print('None:', None)
print('not None:', not None)

# 变量 大小写英文 数字 下划线 且不能以数字开头

a = 1
print('a=', a)
a_1 = 'a_01'
print('a_1=', a_1)
IsTrue = True
print('IsTrue=', IsTrue)
a = 'str'
print('a=', a)

print('10 / 3:', 10 / 3)
print('9 / 3:', 9 / 3)
print('10 // 3:', 10 // 3)
print('9 // 3:', 9 // 3)
print('10 % 3:', 10 % 3)

# 字符编码
# Python 3的字符串使用Unicode
_a = ord('A')
print(_a)
# 65
_a = chr(65)
print(_a)
# 'A'

_a = 'A'.encode('utf-8')
print(_a)
_a = _a.decode('utf-8')
print(_a)


# 格式化字符串
# %运算符 就是用来格式化字符串的
# %d	整数
# %f	浮点数
# %s	字符串
# %x	十六进制整数
a = 'Hello, %s' % 'world'
print(a)
a = 'Hi, %s, you had $%d.' % ('Bob', 100000000)
print(a)

print('%2d-%02d' % (3, 1)) # 3-01
print('%.2f' % 3.1415926535897932384626433) # 3.14

print('progress: %02.2f%%' % 93.3) # progress: 93.30%

# format()
a = 'Hello, {0}, 您尾号为4444的储蓄卡余额为{1:02.2f}%'.format('小明', 17.125)
print(a)

a = '%s, 你今年的收入提升了%02.2f%%哦~' % ('小明', (85 / 72 - 1) * 100)
b = '{0}, 你今年的收入提升了{1:02.2f}%哦~'.format('小明', (85 / 72 - 1) * 100)
print(a)
print(b)


