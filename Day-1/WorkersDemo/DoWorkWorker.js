function doWork(){
	for(var i=0;i<1000;i++)
		for(var j=0;j<1000;j++)
			for(var k=0;k<100;k++)
			{}
}
self.addEventListener("message",function(msgEvt){
	if (msgEvt.data === "start"){
		for(var i=0;i<100;i++){
			doWork();
			self.postMessage({type : "progress", percentCompleted : i + 1});	
		}
		
		self.postMessage({type : "completed"});		
	}
})
