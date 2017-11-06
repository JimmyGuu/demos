# Angular 5.x Template Syntax Learn Note
## Angular 5.x 模板语法学习笔记

标签（空格分隔）： Angular

[Note on github.com](http://www.cnblogs.com/jehorn/p/7744265.html)

---

### 上手

官网Heroes 例子：[Demo On Github](https://github.com/JehornGu/demos/tree/master/01_learn/angular-learn-Heroes)。

### <span id="模板与数据绑定">一、模板与数据绑定</span>

#### **<span id="显示数据">1. 显示数据</span>**

1. `selector` 选择自定义标签的名称。

2. `template` 属性定义内联模板；`templateUrl` 属性定义外链模板。
3. 值的声明和初始化。

    ```
    export class AppComponent {
        // 变量赋值的方式初始化组件
        // title = 'Tour of Heroes';
        // myHero = 'Vencent';
        title: string;
        myHero: string;
        Heroes = ['Windstorm', 'Vencent', 'Bombasto', 'Magneta', 'Tornado',];

        // 构造函数来声明和初始化属性
        constructor() {
          this.title = 'Tour of Heroes';
          this.myHero = this.Heroes[1];
        }
    }
    ```

4. `{{ [data] }}`插值表达式 (interpolation) ，模板绑定属性；
`*ngFor="let [item] of [list]"`模板循环，ngFor
可以为任何[可迭代的 (iterable) ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)对象重复渲染条目；
`ngIf`
指令会根据一个布尔条件来显示或移除一个元素，`*ngIf="[condition]"`。具体参见下一节（模板语法）。
5. 实体类的声明。

    ```
    export class Hero {
       constructor(
       public id: number,
       public name: string) { }
    }
    ```

    > `public id: number,`

    参数作为属性的简写语法：
    - 声明了一个构造函数参数及其类型
    - 声明了一个同名的公共属性
    - `new`出该类的一个实例时，把该属性初始化为响应的参数值

#### **<span id="模板语法">2. 模板语法</span>**

1. <span id="HTML是Angular模板的语言">HTML是Angular模板的语言</span>
    HTML是Angular模板的语言；`<script>`元素，它被禁用（忽略）了，以阻止脚本注入攻击的风险：[安全](https://angular.cn/guide/security)。

2. <span id="插值表达式">插值表达式</span>

    >  `{﻿{...}}`

    ```
    // 作为文本
    <!-- "The sum of 1 + 1 is 2" -->
    <p>The sum of 1 + 1 is {{1 + 1}}</p>
    ```
    ```
    // 作为属性值 image = img,由于此md编辑器会吞掉img标签
   <image src="{{heroImageUrl}}" style="height:30px">
    ```

3. <span id="模板表达式">模板表达式</span>

    JavaScript 中那些具有或可能引发副作用的表达式是被禁止的：
    - 赋值（`=`，`+=`，`-=`，...）
    - `new`运算符
    - 使用`;`或`,`的链式表达式
    - 自增或自减操作符（`++`和`--`）
    - 不支持位运算`|`和`&`
    - 具有新的[模板表达式运算符](https://angular.cn/guide/template-syntax#expression-operators)，比如`|`、`?.`和`!`

    ***<span id="表达式上下文">3.1 表达式上下文</span>***

    典型的*表达式上下文*就是这个组件实例，它是各种绑定值的来源。
    表达式中的上下文变量是由**模板变量**、**指令的上下文变量（如果有）**和**组件的成员**叠加而成的。 如果我们要引用的变量名存在于一个以上的命名空间中，那么，**模板变量是最优先的，其次是指令的上下文变量，最后是组件的成员**。

4. <span id="模板语句">模板语句</span>

    模板语句用来响应由绑定目标（如 HTML 元素、组件或指令）触发的事件。

    ```
    <button (click)="deleteHero()">Delete hero</button>
    ```

    模板语句解析器支持基本赋值 (`=`) 和表达式链 (`;`和`,`)。
    模板语句禁止以下：
    - `new`运算符
    - 自增或自减操作符（`++`和`--`）
    - 操作并赋值（`+=`，`-=`，...）
    - 位操作符`|`和`&`
    - [模板表达式运算符](https://angular.cn/guide/template-syntax#expression-operators)，比如`|`、`?.`和`!`

    ***<span id="语句上下文">4.1 语句上下文</span>***

     典型的语句上下文就是当前组件的实例。
    ```
    <button (click)="onSave($event)">Save</button>
    <button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
    <form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
    ```
    **模板上下文中的变量名的优先级高于组件上下文中的变量名**。在上面的`deleteHero(hero)`中，`hero`是一个模板输入变量，而不是组件中的`hero`属性。

    模板语句不能引用全局命名空间的任何东西。比如不能引用`window` 或 `document`，也不能调用`console.log`或`Math.max`。

5. <span id="绑定语法">绑定语法</span>

    | 数据方向 | 语法 | 绑定类型 |
    | :------| :------ | :------ |
    | 单向<br> 从数据源<br> 到视图目标 | `{{expression}}` <br> `[target]="expression"` <br> `bind-target="expression" ` | 插值表达式<br>Property<br>Attribute<br>类<br>样式 |
    | 单向<br>从视图目标<br>到数据源 | `(target)="statement"`<br>`on-target="statement"` | 事件 |
    | 双向 | `[(target)]="expression"`<br>`bindon-target="expression"` | 双向 |

    > * `HTML attribute value` 指定了初始值；`DOM value property` 是当前值。
    > * 模板绑定是通过 `property` 和事件来工作的，而不是 `attribute`。
    > * 插值表达式和属性绑定只能设置属性，不能设置 attribute。
    > * 在 Angular 的世界中，attribute 唯一的作用是用来初始化元素和指令的状态。

    如图 5-1 所示，创建了一个 `input` 元素，初始设置它的属性(Attribute)为 "Bob"，在获取它的 Attribute 和 使用ng双向绑定值时，用户输入值(123)和 Attribute 的值(Bob)是不一样的。
    ![图5-1](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030144938902-1370301763.png)

    ***5.1 属性绑定 ( [属性名] )***

    * **单向输入**

    * **绑定目标**

        ```
        <img [src]="heroImageUrl">
        ```

    * **消除副作用**

        只绑定数据属性和那些只返回值而不做其它事情的方法。

    * **返回恰当的类型**

        模板表达式应该返回目标属性所需类型的值。如果目标属性想要个数字，就返回数字。HeroDetail组件的hero属性想要一个Hero对象，那就在属性绑定中精确地给它一个Hero对象：
        ```
        <app-hero-detail [hero]="currentHero"></app-hero-detail>
        ```

    * **别忘了方括号**

        方括号告诉 Angular 要计算模板表达式。

    * **一次性字符串初始化**

        > * 目标属性接受字符串值。
        > * 字符串是个固定值，可以直接合并到模块中。
        > * 这个初始值永不改变。

        下面这个例子把HeroDetailComponent的prefix属性初始化为固定的字符串，而不是模板表达式。

        ```
        <app-hero-detail prefix="You are my" [hero]="currentHero"></app-hero-detail>
        ```

    * **属性绑定还是插值表达式？**

        ```
        <p><span>"{{titles}}" is the <i>interpolated</i> title.</span></p>
        <p>"<span [innerHTML]="titles"></span>" is the <i>property bound</i> title.</p>
        ```

        倾向于插值表达式
        但数据类型不是字符串时，就必须使用属性绑定了，如图 5-2 所示：
        ![图 5-2](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030152006918-763073336.png)

    * **内容安全**

        不管是插值表达式还是属性绑定，都不会允许带有 script 标签的 HTML 泄漏到浏览器中。**只渲染没有危害的内容**。比如下面的绑定：

        ```
        <p [innerHTML]="scripts"></p>
        ```

        ![图 5-3](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030152616902-1496424285.png)

    ***<span id="attribute、class 和 style 绑定">5.2 attribute、class 和 style 绑定</span>***

    * **<span id="attribute 绑定">attribute 绑定</span>**

        > 这是“绑定到目标属性 (property)”这条规则中唯一的例外。这是唯一的能创建和设置 attribute 的绑定形式。

        由attr前缀，一个点 (.) 和 attribute 的名字组成。
        把[attr.colspan]绑定到一个计算值：
        ```
        <table border="1">
            <!-- 设置 colspan=2 -->
            <tr><td [attr.colspan]="1 + 1">1-2</td></tr>
            <tr><td>5</td><td>6</td></tr>
        </table>
        ```
        运行结果：

        ![图 5-4](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030155116449-1683807005.png)

        attribute 绑定的主要用例之一是设置 ARIA attribute（译注：ARIA指可访问性，用于给残障人士访问互联网提供便利）：
        ```
        <!-- 创建和设置辅助技术的 ARIA 属性 -->
        <button [attr.aria-label]="actionName">{{actionName}} with Aria</button>
        ```

    * **<span id="cssClassBind">CSS 类绑定</span>**

        由class前缀，一个点 (.)和 CSS 类的名字组成，`[class.class-name]`。

        ```
        <!-- 使用绑定重置/覆盖所有类名 -->
        <div class="bad curly special" [class]="badCurly">Bad curly</div>
        ```

        ![图 5-5](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030155940121-1446551724.png)
        可以绑定到特定的类名。

        ```
        <!-- 用属性打开/关闭“special”类 -->
        <div [class.special]="isSpecial">The class binding is special</div>
        <!-- 绑定`class.special`优先级高于class属性 -->
        <div class="special" [class.special]="!isSpecial">This one is not so special</div>
        ```

        ![图 5-6](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030160742527-1740886098.png)

    * **<span id="cssStyleBind">样式绑定</span>**

        设置内联样式。由style前缀，一个点 (.)和 CSS 样式的属性名组成，`[style.style-property]`。

        ```
        <button [style.color]="isSpecial ? 'red': 'green'">Red</button>
        ```

        有些样式绑定中的样式带有单位:
        ```
        <button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button>
        <button [style.font-size.%]="!isSpecial ? 150 : 50" >Small</button>
        ```

        ![图 5-7](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030161548011-87763280.png)

    ***<span id="事件绑定 ( (事件名) )">5.3 事件绑定 ( (事件名) )</span>***

    事件绑定语法由**等号左侧带圆括号的目标事件**和**右侧引号中的模板语句**组成。

    ```
    <button (click)="onSave()">Save</button>
    ```

    * **<span id="$event 和事件处理语句">\$event 和事件处理语句</span>**

        绑定会通过名叫**\$event**的事件对象传递关于此事件的信息（包括数据值）。

        ```
        <input [value]="currentHero.name"
               (input)="currentHero.name=$event.target.value">
        ```

        执行效果：
        ![图 5-8](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030163946730-429457948.gif)

    * **<span id="使用 EventEmitter 实现自定义事件">[使用 EventEmitter 实现自定义事件](https://angular.cn/guide/template-syntax#使用-eventemitter-实现自定义事件)</span>**

        指令使用 Angular [EventEmitter](https://angular.cn/api/core/EventEmitter) 来触发自定义事件。
        指令创建一个EventEmitter实例，并且把它作为属性暴露出来。
        指令调用 `EventEmitter.emit(payload)` 来触发事件，可以传入任何东西作为消息载荷。
        父指令通过绑定到这个属性来监听事件，并通过 `$event` 对象来访问载荷。

    ***<span id="双向数据绑定">5.4 双向数据绑定 ( [(...)] )</span>***

    `[(x)]`语法结合了属性绑定的方括号`[x]`和事件绑定的圆括号`(x)`。
    `sizer.component.ts`:

    ```
    import { Component, EventEmitter, Input, Output } from '@angular/core';
    @Component({
    	selector: 'app-sizer',
    	templateUrl: './sizer.component.html'
    })
    export class SizerComponent {
    	@Input() size: number | string;
    	@Output() sizeChange = new EventEmitter<number>();

    	dec() { this.resize(-1); }
    	inc() { this.resize(+1); }

    	resize(delta: number) {
    		console.log(delta, +this.size)
    		this.size = Math.min(40, Math.max(8, +this.size + delta));
    		console.log(this.size)
    		this.sizeChange.emit(this.size);
    	}
    }
    ```

    `sizer.component.html`:

    ```
    <div>
    	<button (click)="dec()" title="smaller">-</button>
    	<button (click)="inc()" title="bigger">+</button>
    	<label [style.font-size.px]="size">FontSize: {{size}}px</label>
    </div>
    ```
    `app.component.ts`:
    ```
    <app-sizer [(size)]="fontSizePx"></app-sizer>
    <!-- 等价于下面的写法 -->
    <!-- <app-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></app-sizer> -->
    <div [style.font-size.px]="fontSizePx">Resizable Text</div>
    ```

    `app.component.ts`:

    ```
    fontSizePx: number = 12;
    ```

    同时注意在 `app.module.ts` 引入 `sizer.component.ts`。
    运行结果如图 5-9 所示：
    ![图 5-9](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171030174245543-1801712351.gif)

6. <span id="内置指令">内置指令</span>

    分为**属性型指令**和**结构型指令**。

    ***<span id="常用内置属性型指令">6.1 常用内置属性型指令</span>***

    属性型指令会监听和修改其它HTML元素或组件的行为、元素属性（Attribute）、DOM属性（Property）。
    它们通常会作为HTML属性的名称而应用在元素上。

    > * NgClass - 添加或移除一组CSS类
    > * NgStyle - 添加或移除一组CSS样式
    > * NgModel - 双向绑定到HTML表单元素

    * **<span id="NgClass指令">`NgClass` 指令</span>**

        可以同时添加或移除多个类。
        [CSS 类绑定](#cssClassBind) 是添加删除单个类的最佳途径。
        而同时添加或移除多个 CSS 类，更好的选择可能是`NgClass`。

        ```
        // NgClass
    	canSave: boolean     = true;
    	isUnchanged: boolean = false;
    	isSpecial: boolean   = true;
    	currentClasses: {};
    	setCurrentClasses() {
    		this.currentClasses = {
    			'saveable': this.canSave,
    			'modified': !this.isUnchanged,
    			'special': this.isSpecial
    		}
    	}
    	ngOnInit(): void {
    		// 初始化 currentClasses
    		this.setCurrentClasses();
    	}
        ```

        把`NgClass`属性绑定到`currentClasses`，根据它来设置此元素的CSS类：

        ```
        <div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special</div>
        ```

        运行结果如图 6-1所示：
        ![图 6-1](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171031112002855-680187313.png)

    * **<span id="NgStyle指令">`NgStyle` 指令</span>**

        `NgStyle`绑定可以同时设置多个内联样式。
        同样的，[样式绑定](#cssStyleBind)也是设置单一样式值的简单方式。
        `NgStyle`是同时设置多个内联样式更好的选择。
        ```
        // ngStyle
    	currentStyles: {};
    	setCurrentStyles() {
    		this.currentStyles = {
    			'font-style': this.canSave ? 'italic' : 'normal',
    			'font-weight': !this.isUnchanged ? 'bold' : 'normal',
    			'font-size': this.isSpecial ? '24px' : '12px'
    		}
    	}
    	```

    	把`NgStyle`属性绑定到`currentStyles`设置元素样式：

    	```
    	<div [ngStyle]="currentStyles">
            This div is initially by ngStyle.
        </div>
        ```

        运行结果如图 6-2所示：
        ![图 6-2](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171031113322355-852982340.png)

    * **<span id="NgModel指令">`NgModel` - 使用[(ngModel)]双向绑定到表单元素</span>**

        双向绑定表单元素。
        需要引入`FormModule`。

        ```
        import { FormsModule } from '@angular/forms';

        @NgModule({
            imports: [
                FormsModule
            ]
        })
        export class AppModule { }
        ```

        `ngModel`可以通过之前的属性绑定和事件绑定实现：

        ```
        <input [value]="currentHero.name"
               (input)="currentHero.name=$event.target.value">
        ```

        `ngModel`的展开实现(自己的输入(`ngModel`)属性和输出(`ngModelChange`)属性)：

        ```
        <input [ngModel]="currentHero.name"
               (ngModelChange)="currentHero.name=$event">
        ```

        `ngModel`的合并实现方法是`[(ngModel)]`：

        ```
        <input [(ngModel)]="currentHero.name">
        ```

        `[(ngModel)]`只能设置数据绑定属性，如果有特别需求也可以展开形式：

        `app.component.html`:

        ```
        <input [ngModel]="currentHero.name"
               (ngModelChange)="setUppercaseName($event)">
        ```

        `app.component.ts`:

        ```
        setUppercaseName(name) {
    		this.currentHero.name = name.toUpperCase();
    	}
    	```

        执行效果如下图(图 6-3)所示：
        ![图 6-3](http://images2017.cnblogs.com/blog/1012606/201710/1012606-20171031144553855-689201288.gif)  

    ***<span id="常用内置结构型指令">6.2 常用内置结构型指令</span>***

    结构型指令的职责是HTML布局。添加、移除和操纵DOM元素。
    注意指令前面的`*`号。

    > * NgIf - 根据条件把一个元素添加到DOM中或从DOM移除
    > * NgSwitch - 一组在替代视图之间切换的指令
    > * NgForOf - 对列表中的每个条目重复套用一个模板

    * **<span id="NgIf 指令">`NgIf` 指令</span>**

        和vue的`v-if`, `v-show`一样，不同于隐藏元素。
        `ngIf`可以**防范空指针错误**
        ```
        <div *ngIf="currentHero">Hello, {{ currentHero.name }}</div>
        <div *ngIf="nullHero">Hello, {{ nullHero.name }}</div>
        ```

    * **<span id="NgFor 指令">`NgFor` 指令</span>**

        重复器指令。可以用在简单的元素上，也可以用在一个组件元素上。
        赋值给`*ngFor`的文本是用于指导重复器如何工作的指令 - 微语法(microsyntax)。
        ```
        <div *ngFor="let hero of heroes; let i = index">{{ i }} - {{hero.id + ': ' + hero.name }}</div>
        ```
        `trackBy`可以防止渲染全部条目。
        ```
        trackByHeroes(index: number, hero: Hero): number { return hero.id; }
        ```

        ```
        <div *ngFor="let hero of heroes; trackBy: trackByHeroes">
            ({{hero.id}}) {{hero.name}}
        </div>
        ```

        如图 6-4 所示，如果没有trackBy，这些按钮都会触发完全的DOM元素替换；有了trackBy，则只有修改了id的按钮才会触发元素替换。

        ![图 6-4](http://images2017.cnblogs.com/blog/1012606/201711/1012606-20171104163719904-208001733.gif)

    * **<span id="NgSwitch 指令">`NgSwitch` 指令</span>**  

        可以从多个可能的元素中根据switch条件来显示某一个。包括三个相互协作指令：`NgSwitch`、`NgSwitchCase`、`NgSwitchDefault`。

        ```
        Pick ur favorite hero:
        <div class="favorite-hero">
            <label *ngFor="let hero of heroes">
                <input type="radio" name="hero" value="{{hero}}" (change)="selectHero(hero)"> {{hero.name}}
            </label>

            <div class="hero-desc" *ngIf="selectedHero" [ngSwitch]="selectedHero.id">
                <p *ngSwitchCase="1">Wow. U like {{ selectedHero.name }}, let's play!</p>
                <p *ngSwitchCase="2">Hey man, this is {{ selectedHero.name }}, fk u!</p>
                <p *ngSwitchCase="3">U like {{ selectedHero.name }}? R u sure?</p>
                <p *ngSwitchCase="4">Let's fk {{ selectedHero.name }}, go go go!</p>
                <p *ngSwitchDefault>Little {{ selectedHero.name }} is a cat.</p>
            </div>
        </div>
        ```

        ```
        selectedHero: Hero;
	        selectHero(hero: Hero): void {
		    this.selectedHero = hero;
	    }
	    ```

	    运行效果如图 6-5 所示：

        ![图 6-5](http://images2017.cnblogs.com/blog/1012606/201711/1012606-20171104171703998-92905061.gif)

7. <span id="模板引用变量">模板引用变量（#var）</span>

    模板引用变量通常用来引用变量中的某个DOM元素，它还可以引用Angular组件或指令或Web Component。
    使用井号（#）来声明引用变量。`#phone`的意思就是声明一个名叫`phone`的变量来引用`<input>`元素。
    通俗来讲，`#[name]`表示的是DOM元素，而在DOM其他地方可以直接调用这个`name`，取到的是DOM元素。

    比如下面的例子：
    ```
    <input type="text" #phone placeholder="phone number" [(ngModel)]="phoneNum">

    <button type="button" name="button" (click)="callPhone(phone.value)">console.log phone</button>
    ```

    ```
    phoneNum: string = '15342018244';
	callPhone(phone: string): void {
		console.log(phone);
	}
	```

	运行效果如图 7-1 所示。
	![图 7-1](http://images2017.cnblogs.com/blog/1012606/201711/1012606-20171104174319060-397505617.gif)

	指令也可以修改这种行为，让这个值引用到别处，比如它自身。 `NgForm`指令就是这么做的。

	```
	<form (ngSubmit)="onSubmit(heroForm)" #heroForm="ngForm">
	<!--  这里的heroForm实际上是一个Angular NgForm 指令的引用， 因此具备了跟踪表单中的每个控件的值和有效性的能力。 -->
        <div class="form-group">
            <label for="name">Name
                <input type="text" name="name" required [(ngModel)]="submitHero.name">
            </label>
        </div>
        <button type="submit" [disabled]="!heroForm.form.valid">Submit</button>
    </form>
    <div [hidden]="!heroForm.form.valid">
        {{submitMessage}}
    </div>
    ```

    ```
    submitHero: Hero = new Hero(null, '');
	submitMessage: string;
	onSubmit(hero): void {
		console.log(hero.form.value);
		this.submitMessage = 'success!';
	}
	```

	运行效果如图 7-2 所示：

	![图 7-2](http://images2017.cnblogs.com/blog/1012606/201711/1012606-20171104181046904-101931665.gif)

	可以用`ref-`前缀代替`#`。

	```
	<input ref-fax placeholder="number">
	<button (click)="callFax(fax.value)">BTN</button>
	```

8. <span id="输入输出属性">输入输出属性（@Input和@Output）</span>

    > **所有组件皆为指令**

    > *绑定目标*
    > 等号左侧、绑定符：`()`, `[]`, `[()]`中的属性/事件名、只能绑定到显示标记为输入或输出属性。
    > *绑定源*
    > 等号右侧、引号`""`或插值符号`{{}}`中的部分、源指令中的每个成员都会自动在绑定中可用。

    ***<span id="声明输入和输出属性">8.1 声明输入和输出属性</span>***

    目标属性必须被显示的标记为输入或输出。

    ```
    <app-hero-detail [hero]="currentHero" (deleteRequest)="deleteHero($event)">
    </app-hero-detail>
    ```

    `src/app/hero-detail.component.ts`:
    ```
    @Input()  hero: Hero;
    @Output() deleteRequest = new EventEmitter<Hero>();
    ```

    还可以在指令元数据的`inputs`或`outputs`数组中标记处这些成员。

    ```
    @Component({
        inputs: ['hero'],
        outputs: ['deleteRequest']
    });
    ```

    但是两者**不能**同时使用。

    ***<span id="输入输出选择">8.2 输入输出选择</span>***

    输入属性：接收数据值；
    输出属性：暴露时间生产者。
    输入和输出两个词是从目标指令角度说的。

    ![图 8-1](http://angular.cn/generated/images/guide/template-syntax/input-output.png)

    ***<span id="给输入/输出属性起别名">8.3 给输入/输出属性起别名</span>***

    把别名传进@Input/@Output装饰器，就可以为属性指定别名：

    ```
    @Output('myClick') clicks = new EventEmitter<string>();
    ```

    也可以在`inputs`和`outputs`数组中为属性指定别名：

    ```
    @Directive({
        outputs: ['clicks: myClick']
    });
    ```

9. <span id="模板表达式操作符">模板表达式操作符</span>

    > 管道
    > 安全导航操作符

    ***<span id="管道操作符">9.1 管道操作符（|）</span>***

    适用于小型转换。
    管道是一个简单的函数，它接受一个输入值，并返回转换结果。

    ```
    <div>
        Title through uppercase pipe: {{ title | uppercase }}
    </div>
    ```

    管道操作符可以串联：

    ```
    <div>
        Title through a pupe chain: {{ title | uppercase | lowercase }}
    </div>
    ```

    还可以使用参数：

    ```
    <div>
        Birthday: {{ currentHero?.birthdate | date: 'longDate' }}
    </div>
    ```

    `json`管道用于调试绑定：
    ```
    <div>
        {{ currentHero | json }}
    </div>
    ```

    运行结果如图 9-1 所示：

    ![图 9-1](http://images2017.cnblogs.com/blog/1012606/201711/1012606-20171106162214388-534681586.png)

    ***<span id="安全导航操作符">9.2 安全导航操作符（?.）和空属性路径</span>***

    `?.`安全导航操作符用来**保护出现在属性路径中的`null`和`undefined`值**，保护视图渲染。

    ```
    The current hero's name is {{ currentHero?.name }}
    ```

    如果`currentHero`不存在，那么上面的代码不加`?.`会发生什么？
    草，整个视图都不见了。
    用于替代`*ngIf`和`&&`解决方案。

    ```
    <code>*ngIf 解决方案</code>
    <p><code>fuck.name: </code><span *ngIf="fuck">{{ fuck.name }}</span></p>

    <code>&& 解决方案</code>
    <p><code>fuck.name: </code><span>{{ fuck && fuck.name }}</span></p>
    ```

    ![图 9-2](http://images2017.cnblogs.com/blog/1012606/201711/1012606-20171106163735497-298282602.png)

    ***<span id="非空断言操作符">9.3 非空断言操作符（!）</span>***

    值得一提的是**非空断言操作符不会防止出现null或undefined**。 它只是告诉 TypeScript 的类型检查器对特定的属性表达式，不做 "[严格空值检查](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html)"。

    如果我们打开了[严格空值检查](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html)，那就要用到这个模板操作符，而其它情况下则是可选的。

    > 在 TypeScript 2.0 中，我们可以使用`--strictNullChecks`标志强制开启[严格空值检查](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html)。TypeScript就会确保不存在意料之外的null或undefined。
    > 在这种模式下，有类型的变量默认是不允许null或undefined值的，如果有
    > * 未赋值的变量，
    > * 或者试图把null或undefined赋值给不允许为空的变量，
    > * 如果类型检查器在运行期间无法确定一个变量是null或undefined，
    > 类型检查器就会抛出一个错误。

    在用`*ngIf`来检查过`hero`是已定义的之后，就可以断言`hero`属性一定是已定义的。

    ```
    <div *ngIf="hero">
        The hero's name is {{ hero!.name }}.
    </div>
    ```


> 到这里[模板语法的概述](https://angular.cn/guide/template-syntax#模板语法)就算是完成了。
> 以上贴图源码在[GitHub](https://github.com/JehornGu/demos/tree/master/01_learn/angular-learn-doc-eg/template-syntax)。
> 以上最后更新：<small>2017年11月6日16:48:28</small>

---
