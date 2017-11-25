class OrderEventArgs
{
    public string a{get;set;}
    public string b{get;set;}
}
//这个委托是专门声明事件的；表明这个委托是用来约束事件处理器的；这个委托创建的实例专门存储事件处理器的
public delegate void OrderEventHander(Customer customer,OrderEventArgs e)
class Customer
{
    public double Bill{get；set;}
    public void Pay()
    {
        cw("{0}"，this Bill)
    }

}
