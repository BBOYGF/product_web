<template>
  <div class="content">
    <h1 class="productTitle">MaToPy </h1>
    <p class="productContent">MaToPy 是一个将 Malab 代码编译为 Python
      代码的编译器和函数库，由北京塔尔旺科技有限公司开发，虽然目前还处于初始研发阶段，但已经成功应用到一个实际项目中。</p>
    <div class="codeComparison">
      <div class="codeItem">
        <h2 class="titleStyle">Matlab代码</h2>
        <CodeEditor theme="isbl-editor-dark" :languages="[['matlab', 'Matlab'],['python', 'Python']]"
                    v-model="matlabCode" height="600px" width="500px">

        </CodeEditor>
      </div>
      <div class="codeItem">
        <h2 class="titleStyle">Python代码</h2>
        <CodeEditor theme="isbl-editor-dark" :read-only="true" v-model="pythonCode"
                    :languages="[['python', 'Python'],['matlab', 'Matlab']]" height="600px" width="500px">

        </CodeEditor>
      </div>
    </div>
    <h1 class="titleStyle" style="margin-top: 80px">特点</h1>
    <div class="itemGroup">
      <div class="item" ref="cardRef1">
        <ConvertView></ConvertView>
        <h3>智能转换</h3>
        <p style="text-indent: 2em;">MaToPy 可将 Matlab 代码翻译成 Python 代码</p>
      </div>
      <div class="item" ref="cardRef2">
        <SimilarView></SimilarView>
        <h3>相似代码</h3>
        <p style="text-indent: 2em;">MaToPy 将 Matlab 代码自动转换为相似的Python代码</p>
      </div>
      <div class="item" ref="cardRef3">
        <BatchConversionView></BatchConversionView>
        <h3>批量转换</h3>
        <p style="text-indent: 2em;">MaToPy 可批量将Matlab代码转换为Python代码</p>
      </div>
    </div>
    <div class="itemGroup">
      <div class="item" ref="cardRef4">
        <MaintainView></MaintainView>
        <h3>便于维护</h3>
        <p style="text-indent: 2em;">转换后的Python的代码与原始Matlab代码极为相似便于后期维护</p>
      </div>
      <div class="item" ref="cardRef5">
        <OKView></OKView>
        <h3>确定性</h3>
        <p style="text-indent: 2em;">MaToPy 通过编译原理技术可确定性的将代码转化为对应代码</p>
      </div>
      <div class="item" ref="cardRef6">
        <CustomView></CustomView>
        <h3>可定制化</h3>
        <p style="text-indent: 2em;">MaToPy 可根据用户需求定制化的转换为需要的DML语言</p>
      </div>
    </div>
    <p class="productContent">
      MaToPy 的主要功能是将 Matlab 代码翻译成 Python 代码。因为 Matlab 和基于 numpy 的 python 代码之间，尽管有很多相似之处，但也存在诸多的差异。
      这使得人工将matlab代码翻译为python代码的工作量变得很大，对于几十个matlab源文件、几百上千行的实际项目，手工翻译的方法将无法应付。
      为解决此问题，matopy 通过计算机编译原理技术，通过读取 matlab 代码、进行词法分析语法分析，最终将其编译为人类可读、可用的python代码。
      matopy 产品的特点是翻译得到的python代码和matlab代码极为相似，稍作调整、调试后就可以运行。
      因为代码相似度极高，便于后期matlab代码升级后对python代码做相应的升级、维护。
    </p>
    <h2 class="titleStyle">网站地图</h2>
    <el-carousel :interval="4000" type="card" height="200px" style="width: 100% ;height: 200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center" style="background: #F3F4F6;height: 200px">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>

  <div class="flowDiv" ref="cardRef7">
    <ContactUsView></ContactUsView>
  </div>


</template>

<script lang="ts" setup name="HomeView">
import { useLightCard } from '@/util/use-light-card'
import ContactUsView from '@/components/icons/ContactUsView.vue'
import ConvertView from '@/components/icons/ConvertView.vue'
import SimilarView from '@/components/icons/SimilarView.vue'
import BatchConversionView from '@/components/icons/BatchConversionView.vue'
import MaintainView from '@/components/icons/MaintainView.vue'
import OKView from '@/components/icons/OKView.vue'
import CustomView from '@/components/icons/CustomView.vue'

import CodeEditor from 'simple-code-editor'
import hljs from 'highlight.js'
import { ref } from 'vue'

const { cardRef: cardRef1 } = useLightCard({
  light: {
    color: '#FCD429'
  }
})

const { cardRef: cardRef2 } = useLightCard({
  light: {
    color: '#FCD429'
  }
})

const { cardRef: cardRef3 } = useLightCard({
  light: {
    color: '#FCD429'
  }
})
const { cardRef: cardRef4 } = useLightCard({
  light: {
    color: '#FCD429'
  }
})

const { cardRef: cardRef5 } = useLightCard({
  light: {
    color: '#FCD429'
  }
})

const { cardRef: cardRef6 } = useLightCard({
  light: {
    color: '#FCD429'
  }
})

const { cardRef: cardRef7 } = useLightCard({
  light: {
    color: '#FCD429'
  }
})
const originalMatlabCode= 'function [name, name2, name3] = test_function_rename(f)\n' +
  '\t% 自动改名与 python 中内建函数重名的函数\n' +
  '    name = dir(f);\n' +
  '\t\n' +
  '\t% 自动翻译函数调用\n' +
  '    [turnout_result] = sub_main_turnout_analysis_geo(fname_dir0,fname0,line_name,tz_curv,tz_turnout,mile_min,mile_max,distance_table,channelin,channelout);\n' +
  '\n' +
  '    A = [1 2 3]\n' +
  '\t\n' +
  '    B = [A, 4, 5]\n' +
  '    B = [A 4 5]\n' +
  '\t\n' +
  '    % 垂直串联矩阵\n' +
  '    C = [A; 4 5 6]\n' +
  '\n' +
  '    % 复杂一些的矩阵组合\n' +
  '    D = [1 2 3;\n' +
  '         4 5 6]\n' +
  '\n' +
  '    % 更复杂的二维矩阵创建\n' +
  '    F = [a-b(), c(1:2); d(1,2), e];\n' +
  '\n' +
  '    dir([fname_dir0 \'*.geo\'])\n' +
  '\n' +
  '    id_tmp=find(wdisp_ver>=mile_sw0 & wdisp_ver<=mile_sw1);\n' +
  '\n' +
  '    indmin = find(d1.*d2<0 & d1<0)+1;\n' +
  '\n' +
  '    if ic0 > 10 | ic1 > 10\n' +
  '        a = 1;\n' +
  '    end\n' +
  '\n' +
  '    % & | 混排的优先级\n' +
  '    a = d1 | d2 & d3\n' +
  '    b = d1 && d2 & d3'
const matlabCode =ref( '')
const originalPythonCode= '@function\n' +
  'def test_function_rename(f=None,*args,**kwargs):\n' +
  '    varargin = test_function_rename.varargin\n' +
  '    nargin = test_function_rename.nargin\n' +
  '\n' +
  '\t# 自动改名与 python 中内建函数重名的函数\n' +
  '    name=m_dir(f)\n' +
  '\t\n' +
  '\t# 自动翻译函数调用\tturnout_result=sub_main_turnout_analysis_geo(fname_dir0,fname0,line_name,tz_curv,tz_turnout,mile_min,mile_max,distance_table,channelin,channelout)\n' +
  '    \n' +
  '    A=horzcat(1,2,3)\n' +
  '    \n' +
  '    B=horzcat(A,4,5)\n' +
  '    B=horzcat(A,4,5)\n' +
  '    \n' +
  '    C=vertcat(A, horzcat(4,5,6))\n' +
  '    \n' +
  '    D=vertcat(horzcat(1,2,3), horzcat(4,5,6))\n' +
  '    \n' +
  '    E=horzcat(7,8,9,10,11,12)\n' +
  '    \n' +
  '    F=vertcat(horzcat(a - b(),c(arange(1,2))), horzcat(d(1,2),e))\n' +
  '    \n' +
  '    m_dir(horzcat(fname_dir0,\'*.geo\'))\n' +
  '    \n' +
  '    id_tmp=find(logical_and(wdisp_ver >= mile_sw0,wdisp_ver <= mile_sw1))\n' +
  '    \n' +
  '    indmin=find(logical_and(times(d1,d2) < 0,d1 < 0)) + 1\n' +
  '    \n' +
  '    if logical_or(ic0 > 10,ic1 > 10):\n' +
  '        a=1\n' +
  '    \n' +
  '    # & | 混排的优先级\n' +
  '    a=logical_or(d1,logical_and(d2,d3))\n' +
  '    b=d1 and logical_and(d2,d3)\n' +
  '\t\n' +
  '\t# 自动添加返回值语句\n' +
  '    return name,name2,name3\n' +
  '\t'
const pythonCode = ref('')

let index = 0;
const interval = setInterval(() => {
  matlabCode.value = originalMatlabCode.slice(0, index);
  index++;
  if (index > originalMatlabCode.length) {
    clearInterval(interval);
  }
}, 10); // 每隔200ms显示一个字

const interval2 = setInterval(() => {
  pythonCode.value = originalPythonCode.slice(0, index);
  index++;
  if (index > originalPythonCode.length) {
    clearInterval(interval2);
  }
}, 10); // 每隔200ms显示一个字



</script>

<style>
.content {
  width: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

}

.itemGroup {
  display: flex;
  width: 1024px;
  height: 300px;
  flex-direction: row;
  justify-content: space-around;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  background: #F3F4F6;
  border-radius: 10px;
  height: 250px;
  width: 250px;
  border: 0px solid rgba(1, 1, 1, 0.5);
  color: black;

}

.titleStyle {
  color: #396280;
}

.productTitle {
  height: 40px;
  margin-top: 10px;
  color: #396280;
  text-align: center;
  font-size: 70px;
  font-weight: bold;
  font-family: '微软雅黑';
}

.productContent {
  text-indent: 2em;
  font-size: 20px;
}

.codeComparison {
  height: 600px;
  width: 1024px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}

.codeItem {
  flex: 1;
  height: 600px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.flowDiv {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>