document.write('<style>		div.embedPastebin { text-align:left; padding: 0; color: #000; margin: 0; font-family: monospace; background: #F7F7F7; border: 1px solid ddd; border-radius:3px; }		div.embedPastebin {  }		div.embedPastebin div.embedFooter { background: #F7F7F7; color: #333; font-size: 100%; padding: 6px 12px; border-bottom: 1px solid #ddd; text-transform:uppercase; }		div.embedPastebin div.embedFooter a,		div.embedPastebin div.embedFooter a:visited { color: #336699; text-decoration:none; }		div.embedPastebin div.embedFooter a:hover { color: red; }		.noLines ol { list-style-type: none; padding-left: 0.5em; }		.embedPastebin{background-color:#F8F8F8;border:1px solid #ddd;font-size:12px;overflow:auto;margin: 0 0 0 0;padding:0 0 0 0;line-height:21px}		.embedPastebin div { line-height:21px; font-family:Consolas, Menlo, Monaco, Lucida Console,\'Bitstream Vera Sans Mono\',\'Courier\',monospace; }		ol { margin:0; padding: 0 0 0 55px}		ol li { border:0; margin:0;padding:0; }		li.ln-xtra .de1, li.ln-xtra .de2 {background:#F8F8CE;}		.embedPastebin ol li.li1 { margin: 0; }		.embedPastebin ol li.li2 { margin: 0; }.c .de1, .c .de2 {-moz-user-select: text;-khtml-user-select: text;-webkit-user-select: text;-ms-user-select: text;user-select: text;margin:0; padding: 0 8px; background:none; vertical-align:top;color:#000;border-left: 1px solid #ddd; margin: 0 0 0 -7px; position: relative; background: #ffffff;}.c  {color:#ACACAC;}.c .imp {font-weight: bold; color: red;}.c li, .c .li1 {-moz-user-select: -moz-none;-khtml-user-select: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;}.c .ln {width:1px;text-align:right;margin:0;padding:0 2px;vertical-align:top;}.c .kw1 {color: #b1b100;}.c .kw2 {color: #000000; font-weight: bold;}.c .kw3 {color: #000066;}.c .kw4 {color: #993333;}.c .co1 {color: #666666; font-style: italic;}.c .co2 {color: #339933;}.c .coMULTI {color: #808080; font-style: italic;}.c .es0 {color: #000099; font-weight: bold;}.c .es1 {color: #000099; font-weight: bold;}.c .es2 {color: #660099; font-weight: bold;}.c .es3 {color: #660099; font-weight: bold;}.c .es4 {color: #660099; font-weight: bold;}.c .es5 {color: #006699; font-weight: bold;}.c .br0 {color: #009900;}.c .sy0 {color: #339933;}.c .st0 {color: #ff0000;}.c .nu0 {color: #0000dd;}.c .nu6 {color: #208080;}.c .nu8 {color: #208080;}.c .nu12 {color: #208080;}.c .nu16 {color:#800080;}.c .nu17 {color:#800080;}.c .nu18 {color:#800080;}.c .nu19 {color:#800080;}.c .me1 {color: #202020;}.c .me2 {color: #202020;}.c .ln-xtra, .c li.ln-xtra, .c div.ln-xtra {background:#FFFF88;}.c span.xtra { display:block; }	</style>	<div class="embedPastebin">		<div class="embedFooter">Data hosted with &hearts; by <a href="http://pastebin.com" target="_blank">Pastebin.com</a> - <a href="http://pastebin.com/raw/2jyCDHcf" target="_blank">Download Raw</a> - <a href="http://pastebin.com/2jyCDHcf" target="_blank">See Original</a></div><div class="c"><ol><li class="li1"><div class="de1"><span class="coMULTI">/*</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp; Saving &amp; Loading Settings on SD Card with Arduino by Alex Shu</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp; http://overskill.alexshu.com/saving-loading-settings-on-sd-card-with-arduino/</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp; </span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp; SD card connections:</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;** MOSI - pin 11</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;** MISO - pin 12</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;** CLK - pin 13</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;** CS - pin 4</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;*/</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li2"><div class="de2">&nbsp;<span class="co2">#include &lt;SPI.h&gt;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co2">#include &lt;SD.h&gt;</span></div></li><li class="li2"><div class="de2">&nbsp;</div></li><li class="li1"><div class="de1">&nbsp;File myFile<span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">int</span> exINT <span class="sy0">=</span> <span class="nu0">15</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw4">float</span> exFloat <span class="sy0">=</span> <span class="nu16">1.12345</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;boolean exBoolean <span class="sy0">=</span> <span class="kw2">true</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw4">long</span> exLong <span class="sy0">=</span> <span class="nu0">2123456789</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;</div></li><li class="li1"><div class="de1">&nbsp;<span class="kw4">void</span> setup<span class="br0">&#40;</span><span class="br0">&#41;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// Open serial communications and wait for port to open:</span></div></li><li class="li2"><div class="de2">&nbsp;Serial.<span class="me1">begin</span><span class="br0">&#40;</span><span class="nu0">9600</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">while</span> <span class="br0">&#40;</span><span class="sy0">!</span>Serial<span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="sy0">;</span> <span class="co1">// wait for serial port to connect. Needed for Leonardo only</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;Serial.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;Initializing SD card...&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// On the Ethernet Shield, CS is pin 4. It\'s set as an output by default.</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="co1">// Note that even if it\'s not used as the CS pin, the hardware SS pin</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// (10 on most Arduino boards, 53 on the Mega) must be left as an output</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="co1">// or the SD library functions will not work.</span></div></li><li class="li1"><div class="de1">&nbsp;pinMode<span class="br0">&#40;</span><span class="nu0">10</span><span class="sy0">,</span> OUTPUT<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">if</span> <span class="br0">&#40;</span><span class="sy0">!</span>SD.<span class="me1">begin</span><span class="br0">&#40;</span><span class="nu0">4</span><span class="br0">&#41;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;Serial.<span class="me1">println</span><span class="br0">&#40;</span><span class="st0">&quot;initialization failed!&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">return</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;Serial.<span class="me1">println</span><span class="br0">&#40;</span><span class="st0">&quot;initialization done.&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;writeSDSettings<span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;readSDSettings<span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li2"><div class="de2">&nbsp;<span class="coMULTI">/*</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;//Debuuging Printing</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;Serial.println(&quot;In RAM Memory&quot;);</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;Serial.print(&quot;exINT=&quot;);</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;Serial.println(exINT);</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;Serial.print(&quot;exFloat=&quot;);</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;Serial.println(exFloat,10);</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;Serial.print(&quot;exBoolean=&quot;);</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;Serial.println(exBoolean);</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;Serial.print(&quot;exLong=&quot;);</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;Serial.println(exLong); </span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;*/</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">void</span> loop<span class="br0">&#40;</span><span class="br0">&#41;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">void</span> readSDSettings<span class="br0">&#40;</span><span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw4">char</span> character<span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;String settingName<span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;String settingValue<span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile <span class="sy0">=</span> SD.<span class="me1">open</span><span class="br0">&#40;</span><span class="st0">&quot;settings.txt&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">if</span> <span class="br0">&#40;</span>myFile<span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">while</span> <span class="br0">&#40;</span>myFile.<span class="me1">available</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;character <span class="sy0">=</span> myFile.<span class="me1">read</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">while</span><span class="br0">&#40;</span><span class="br0">&#40;</span>myFile.<span class="me1">available</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="br0">&#41;</span> <span class="sy0">&amp;&amp;</span> <span class="br0">&#40;</span>character <span class="sy0">!=</span> <span class="st0">\'[\'</span><span class="br0">&#41;</span><span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;character <span class="sy0">=</span> myFile.<span class="me1">read</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;character <span class="sy0">=</span> myFile.<span class="me1">read</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">while</span><span class="br0">&#40;</span><span class="br0">&#40;</span>myFile.<span class="me1">available</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="br0">&#41;</span> <span class="sy0">&amp;&amp;</span> <span class="br0">&#40;</span>character <span class="sy0">!=</span> <span class="st0">\'=\'</span><span class="br0">&#41;</span><span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;settingName <span class="sy0">=</span> settingName <span class="sy0">+</span> character<span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;character <span class="sy0">=</span> myFile.<span class="me1">read</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;character <span class="sy0">=</span> myFile.<span class="me1">read</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">while</span><span class="br0">&#40;</span><span class="br0">&#40;</span>myFile.<span class="me1">available</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="br0">&#41;</span> <span class="sy0">&amp;&amp;</span> <span class="br0">&#40;</span>character <span class="sy0">!=</span> <span class="st0">\']\'</span><span class="br0">&#41;</span><span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;settingValue <span class="sy0">=</span> settingValue <span class="sy0">+</span> character<span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;character <span class="sy0">=</span> myFile.<span class="me1">read</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">if</span><span class="br0">&#40;</span>character <span class="sy0">==</span> <span class="st0">\']\'</span><span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;</div></li><li class="li1"><div class="de1">&nbsp;<span class="coMULTI">/*</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;//Debuuging Printing</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;Serial.print(&quot;Name:&quot;);</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;Serial.println(settingName);</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;Serial.print(&quot;Value :&quot;);</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;Serial.println(settingValue);</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;*/</span></div></li><li class="li2"><div class="de2">&nbsp;</div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// Apply the value to the parameter</span></div></li><li class="li2"><div class="de2">&nbsp;applySetting<span class="br0">&#40;</span>settingName<span class="sy0">,</span>settingValue<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// Reset Strings</span></div></li><li class="li2"><div class="de2">&nbsp;settingName <span class="sy0">=</span> <span class="st0">&quot;&quot;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;settingValue <span class="sy0">=</span> <span class="st0">&quot;&quot;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="co1">// close the file:</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">close</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span> <span class="kw1">else</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// if the file didn\'t open, print an error:</span></div></li><li class="li2"><div class="de2">&nbsp;Serial.<span class="me1">println</span><span class="br0">&#40;</span><span class="st0">&quot;error opening settings.txt&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li2"><div class="de2">&nbsp;<span class="coMULTI">/* Apply the value to the parameter by searching for the parameter name</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;Using String.toInt(); for Integers</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;toFloat(string); for Float</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;toBoolean(string); for Boolean</span></div></li><li class="li2"><div class="de2"><span class="coMULTI">&nbsp;toLong(string); for Long</span></div></li><li class="li1"><div class="de1"><span class="coMULTI">&nbsp;*/</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">void</span> applySetting<span class="br0">&#40;</span>String settingName<span class="sy0">,</span> String settingValue<span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">if</span><span class="br0">&#40;</span>settingName <span class="sy0">==</span> <span class="st0">&quot;exINT&quot;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;exINT<span class="sy0">=</span>settingValue.<span class="me1">toInt</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">if</span><span class="br0">&#40;</span>settingName <span class="sy0">==</span> <span class="st0">&quot;exFloat&quot;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;exFloat<span class="sy0">=</span>toFloat<span class="br0">&#40;</span>settingValue<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">if</span><span class="br0">&#40;</span>settingName <span class="sy0">==</span> <span class="st0">&quot;exBoolean&quot;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;exBoolean<span class="sy0">=</span>toBoolean<span class="br0">&#40;</span>settingValue<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">if</span><span class="br0">&#40;</span>settingName <span class="sy0">==</span> <span class="st0">&quot;exLong&quot;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;exLong<span class="sy0">=</span>toLong<span class="br0">&#40;</span>settingValue<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;</div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// converting string to Float</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">float</span> toFloat<span class="br0">&#40;</span>String settingValue<span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw4">char</span> floatbuf<span class="br0">&#91;</span>settingValue.<span class="me1">length</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">+</span><span class="nu0">1</span><span class="br0">&#93;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;settingValue.<span class="me1">toCharArray</span><span class="br0">&#40;</span>floatbuf<span class="sy0">,</span> <span class="kw4">sizeof</span><span class="br0">&#40;</span>floatbuf<span class="br0">&#41;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw4">float</span> f <span class="sy0">=</span> <span class="kw3">atof</span><span class="br0">&#40;</span>floatbuf<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">return</span> f<span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;</div></li><li class="li1"><div class="de1">&nbsp;<span class="kw4">long</span> toLong<span class="br0">&#40;</span>String settingValue<span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">char</span> longbuf<span class="br0">&#91;</span>settingValue.<span class="me1">length</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">+</span><span class="nu0">1</span><span class="br0">&#93;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;settingValue.<span class="me1">toCharArray</span><span class="br0">&#40;</span>longbuf<span class="sy0">,</span> <span class="kw4">sizeof</span><span class="br0">&#40;</span>longbuf<span class="br0">&#41;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">long</span> l <span class="sy0">=</span> <span class="kw3">atol</span><span class="br0">&#40;</span>longbuf<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">return</span> l<span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li2"><div class="de2">&nbsp;<span class="co1">// Converting String to integer and then to boolean</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// 1 = true</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="co1">// 0 = false</span></div></li><li class="li1"><div class="de1">&nbsp;boolean toBoolean<span class="br0">&#40;</span>String settingValue<span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw1">if</span><span class="br0">&#40;</span>settingValue.<span class="me1">toInt</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">==</span><span class="nu0">1</span><span class="br0">&#41;</span><span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">return</span> <span class="kw2">true</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span> <span class="kw1">else</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="kw1">return</span> <span class="kw2">false</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li><li class="li2"><div class="de2">&nbsp;</div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// Writes A Configuration file</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="kw4">void</span> writeSDSettings<span class="br0">&#40;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// Delete the old One</span></div></li><li class="li2"><div class="de2">&nbsp;SD.<span class="kw3">remove</span><span class="br0">&#40;</span><span class="st0">&quot;settings.txt&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// Create new one</span></div></li><li class="li2"><div class="de2">&nbsp;myFile <span class="sy0">=</span> SD.<span class="me1">open</span><span class="br0">&#40;</span><span class="st0">&quot;settings.txt&quot;</span><span class="sy0">,</span> FILE_WRITE<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="co1">// writing in the file works just like regular print()/println() function</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;[&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;exINT=&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span>exINT<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">println</span><span class="br0">&#40;</span><span class="st0">&quot;]&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;[&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;exFloat=&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span>exFloat<span class="sy0">,</span><span class="nu0">5</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">println</span><span class="br0">&#40;</span><span class="st0">&quot;]&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;[&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;exBoolean=&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span>exBoolean<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">println</span><span class="br0">&#40;</span><span class="st0">&quot;]&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;[&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span><span class="st0">&quot;exLong=&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;myFile.<span class="me1">print</span><span class="br0">&#40;</span>exLong<span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">println</span><span class="br0">&#40;</span><span class="st0">&quot;]&quot;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="co1">// close the file:</span></div></li><li class="li1"><div class="de1">&nbsp;myFile.<span class="me1">close</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li2"><div class="de2">&nbsp;<span class="co1">//Serial.println(&quot;Writing done.&quot;);</span></div></li><li class="li1"><div class="de1">&nbsp;<span class="br0">&#125;</span></div></li></ol></div></div>');