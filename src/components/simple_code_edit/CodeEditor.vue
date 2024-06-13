<template>
  <div
    :theme="theme"
    class="code-editor"
    :class="{ 'hide-header': !header, scroll: scroll, 'read-only': readOnly, wrap: wrap }"
    :style="{ width: width, height: height, zIndex: zIndex, maxWidth: maxWidth, minWidth: minWidth, maxHeight: maxHeight, minHeight: minHeight }"
  >
    <div class="hljs" :style="{ borderRadius: borderRadius }">
      <div
        class="header"
        :class="{ border: showLineNums }"
        v-if="header"
        :style="{ borderRadius: borderRadius + ' ' + borderRadius + ' 0 0' }"
      >
        <Dropdown
          v-if="displayLanguage"
          :width="langListWidth"
          :title="languageTitle"
          :disabled="languages.length <= 1"
          :defaultDisplay="langListDisplay"
        >
          <ul class="lang-list hljs" :style="{ height: langListHeight }">
            <li v-for="(lang, index) in languages" :key="index" @click="changeLang(lang)">
              {{ lang[1] ? lang[1] : lang[0] }}
            </li>
          </ul>
        </Dropdown>
        <CopyCode @click="copy" v-if="copyCode"></CopyCode>
      </div>
      <div
        class="code-area"
        :style="{ borderRadius: header ? '0 0 ' + borderRadius + ' ' + borderRadius : borderRadius }"
      >
        <div
          v-if="showLineNums"
          ref="lineNums"
          class="line-nums hljs"
          :style="{ fontSize: fontSize, paddingTop: header ? '10px' : padding, paddingBottom: padding, top: top + 'px' }"
        >
          <div>1</div>
          <div v-for="num in lineNum" :key="num">{{ num + 1 }}</div>
          <div>&nbsp;</div>
        </div>
        <textarea
          title="textarea"
          :readOnly="readOnly"
          :style="{ fontSize: fontSize, padding: !header ? padding : showLineNums ? '10px ' + padding + ' ' + padding : '0 ' + padding + ' ' + padding, marginLeft: showLineNums ? lineNumsWidth + 'px' : '0', width: showLineNums ? 'calc(100% - ' + lineNumsWidth + 'px)' : '100%' }"
          ref="textarea"
          :autofocus="autofocus"
          spellcheck="false"
          @keydown.tab.prevent.stop="tab"
          @scroll="calcScrollDistance"
          :value="modelValue == undefined ? content : modelValue"
          @input="updateValue"
        ></textarea>
        <pre
          :style="{ paddingRight: scrollBarWidth + 'px', paddingBottom: scrollBarHeight + 'px', marginLeft: showLineNums ? lineNumsWidth + 'px' : '0', width: showLineNums ? 'calc(100% - ' + lineNumsWidth + 'px)' : '100%' }"
        >
          <code
            ref="code"
            v-highlight="contentValue"
            :class="languageClass"
            :style="{ top: top + 'px', left: left + 'px', fontSize: fontSize, padding: !header ? padding : showLineNums ? '10px ' + padding + ' ' + padding : '0 ' + padding + ' ' + padding }"
          ></code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import hljs from 'highlight.js';
import Dropdown from './Dropdown.vue';
import CopyCode from './CopyCode.vue';
import '@/assets/themes/themes-base16.css';
import '@/assets/themes/themes.css';

interface Language {
  [index: number]: string;
}

export default defineComponent({
  name: 'CodeEditor',
  components: {
    Dropdown,
    CopyCode,
  },
  props: {
    lineNums: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
    },
    value: {
      type: String,
    },
    theme: {
      type: String,
      default: 'github-dark',
    },
    tabSpaces: {
      type: Number,
      default: 2,
    },
    wrap: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '540px',
    },
    height: {
      type: String,
      default: 'auto',
    },
    maxWidth: {
      type: String,
    },
    minWidth: {
      type: String,
    },
    maxHeight: {
      type: String,
    },
    minHeight: {
      type: String,
    },
    borderRadius: {
      type: String,
      default: '12px',
    },
    languages: {
      type: Array as () => Language[],
      default: () => [['javascript', 'JS']],
    },
    langListWidth: {
      type: String,
      default: '110px',
    },
    langListHeight: {
      type: String,
      default: 'auto',
    },
    langListDisplay: {
      type: Boolean,
      default: false,
    },
    displayLanguage: {
      type: Boolean,
      default: true,
    },
    copyCode: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: String,
      default: '0',
    },
    fontSize: {
      type: String,
      default: '17px',
    },
    padding: {
      type: String,
      default: '20px',
    },
  },
  setup(props, { emit }) {
    const scrollBarWidth = ref(0);
    const scrollBarHeight = ref(0);
    const top = ref(0);
    const left = ref(0);
    const languageClass = ref(`hljs language-${props.languages[0][0]}`);
    const languageTitle = ref<string>(props.languages[0][1] ? props.languages[0][1] : props.languages[0][0]);
    const content = ref<string>(props.value || '');
    const cursorPosition = ref(0);
    const insertTab = ref(false);
    const lineNum = ref(0);
    const lineNumsWidth = ref(0);
    const scrolling = ref(false);
    const textareaHeight = ref(0);
    const showLineNums = ref(props.wrap ? false : props.lineNums);

    const tabWidth = computed(() => {
      let result = '';
      for (let i = 0; i < props.tabSpaces; i++) {
        result += ' ';
      }
      return result;
    });

    const contentValue = computed(() => {
      return props.modelValue === undefined ? content.value + '\n' : props.modelValue + '\n';
    });

    const scroll = computed(() => {
      return props.height !== 'auto';
    });

    const updateValue = (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      if (props.modelValue === undefined) {
        content.value = target.value;
      } else {
        emit('update:modelValue', target.value);
      }
    };

    const changeLang = (lang: Language) => {
      languageTitle.value = lang[1] ? lang[1] : lang[0];
      languageClass.value = 'language-' + lang[0];
      emit('lang', lang[0]);
    };

    const tab = () => {
      const textarea = textareaRef.value as HTMLTextAreaElement;
      if (document.execCommand('insertText')) {
        document.execCommand('insertText', false, tabWidth.value);
      } else {
        const cursorPositionValue = textarea.selectionStart;
        content.value =
          content.value.substring(0, cursorPositionValue) + tabWidth.value + content.value.substring(cursorPositionValue);
        cursorPosition.value = cursorPositionValue + tabWidth.value.length;
        insertTab.value = true;
      }
    };

    const calcScrollDistance = (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      if (codeRef.value) {
        (codeRef.value as any).scrolling = true;
        scrolling.value = true;
        top.value = -target.scrollTop;
        left.value = -target.scrollLeft;
      }
    };

    const resizer = () => {
      // textareaResizer
      const textareaResizer = new ResizeObserver((entries) => {
        const target = entries[0].target as HTMLElement;
        scrollBarWidth.value = target.offsetWidth - target.clientWidth;
        scrollBarHeight.value = target.offsetHeight - target.clientHeight;
        textareaHeight.value = target.offsetHeight;
      });
      if (textareaRef.value) {
        textareaResizer.observe(textareaRef.value);
      }

      // lineNumsResizer
      const lineNumsResizer = new ResizeObserver((entries) => {
        const target = entries[0].target as HTMLElement;
        lineNumsWidth.value = target.offsetWidth;
      });
      if (lineNumsRef.value) {
        lineNumsResizer.observe(lineNumsRef.value);
      }
    };

    const copy = () => {
      const textarea = textareaRef.value as HTMLTextAreaElement;
      if (document.execCommand('copy')) {
        textarea.select();
        document.execCommand('copy');
        window.getSelection()?.removeAllRanges();
      } else {
        navigator.clipboard.writeText(textarea.value);
      }
    };

    const getLineNum = () => {
      const textarea = textareaRef.value;
      if (textarea) {
        const str = textarea.value;
        let lineNumValue = 0;
        let position = str.indexOf('\n');
        while (position !== -1) {
          lineNumValue++;
          position = str.indexOf('\n', position + 1);
        }
        const singleLineHeight = (lineNumsRef.value?.firstChild as HTMLElement)?.offsetHeight || 0;
        const heightNum = Math.floor(textareaHeight.value / singleLineHeight) - 1;
        lineNum.value = props.height === 'auto' ? lineNumValue : lineNumValue > heightNum ? lineNumValue : heightNum;
      }
    };

    const textareaRef = ref<HTMLTextAreaElement | null>(null);
    const codeRef = ref<HTMLElement | null>(null);
    const lineNumsRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      emit('lang', props.languages[0][0]);
      emit('content', content.value);
      emit('textarea', textareaRef.value);
      resizer();
    });

    watch(insertTab, (newVal) => {
      if (newVal && textareaRef.value) {
        textareaRef.value.setSelectionRange(cursorPosition.value, cursorPosition.value);
        insertTab.value = false;
      }
    });

    watch(scrolling, (newVal) => {
      if (newVal) {
        scrolling.value = false;
      } else {
        getLineNum();
      }
    });

    return {
      scrollBarWidth,
      scrollBarHeight,
      top,
      left,
      languageClass,
      languageTitle,
      content,
      cursorPosition,
      insertTab,
      lineNum,
      lineNumsWidth,
      scrolling,
      textareaHeight,
      showLineNums,
      tabWidth,
      contentValue,
      scroll,
      updateValue,
      changeLang,
      tab,
      calcScrollDistance,
      resizer,
      copy,
      getLineNum,
      textareaRef,
      codeRef,
      lineNumsRef,
    };
  },
  directives: {
    highlight: {
      mounted(el: HTMLElement, binding: any) {
        el.textContent = binding.value;
        hljs.highlightElement(el);
      },
      updated(el: HTMLElement, binding: any) {
        if ((el as any).scrolling) {
          (el as any).scrolling = false;
        } else {
          el.textContent = binding.value;
          hljs.highlightElement(el);
        }
      },
    },
  },
});
</script>

<style scoped>
.code-editor {
  position: relative;
}
.code-editor > div {
  width: 100%;
  height: 100%;
}
/* header */
.code-editor .header {
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  height: 34px;
}
.code-editor .header > .dropdown {
  position: absolute;
  top: 12px;
  left: 18px;
}
.code-editor .header > .copy-code {
  position: absolute;
  top: 10px;
  right: 12px;
}
/* code-area */
.code-editor .code-area {
  position: relative;
  z-index: 0;
  text-align: left;
  overflow: hidden;
}
/* font style */
.code-editor .code-area > textarea,
.code-editor .code-area > pre > code,
.code-editor .line-nums > div {
  font-family: Consolas, Monaco, monospace;
  line-height: 1.5;
}
.code-editor .code-area > textarea:hover,
.code-editor .code-area > textarea:focus-visible {
  outline: none;
}
.code-editor .code-area > textarea {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-y: hidden;
  box-sizing: border-box;
  caret-color: rgb(127, 127, 127);
  color: transparent;
  white-space: pre;
  word-wrap: normal;
  border: 0;
  width: 100%;
  height: 100%;
  background: none;
  resize: none;
}
.code-editor .code-area > pre {
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  overflow: hidden;
  font-size: 0;
  margin: 0;
}
.code-editor .code-area > pre > code {
  background: none;
  display: block;
  position: relative;
  overflow-x: visible !important;
  border-radius: 0;
  box-sizing: border-box;
  margin: 0;
}
/* wrap code */
.code-editor.wrap .code-area > textarea,
.code-editor.wrap .code-area > pre > code {
  white-space: pre-wrap;
  word-wrap: break-word;
}
/* hide-header */
.code-editor.hide-header.scroll .code-area {
  height: 100%;
}
/* scroll */
.code-editor.scroll .code-area {
  height: calc(100% - 34px);
}
.code-editor.scroll .code-area > textarea {
  overflow: auto;
}
.code-editor.scroll .code-area > pre {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* dropdown */
.code-editor .list {
  -webkit-user-select: none;
  user-select: none;
  height: 100%;
  font-family: sans-serif;
}
.code-editor .list > .lang-list {
  border-radius: 5px;
  box-sizing: border-box;
  overflow: auto;
  font-size: 13px;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
}
.code-editor .list > .lang-list > li {
  font-size: 13px;
  transition: background 0.16s ease, color 0.16s ease;
  box-sizing: border-box;
  padding: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
}
.code-editor .list > .lang-list > li:first-child {
  padding-top: 5px;
}
.code-editor .list > .lang-list > li:last-child {
  padding-bottom: 5px;
}
.code-editor .list > .lang-list > li:hover {
  background: rgba(160, 160, 160, 0.4);
}
/* line-nums */
.code-editor .line-nums {
  min-width: 36px;
  text-align: right;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  padding-right: 8px;
  padding-left: 8px;
  opacity: 0.3;
}
.code-editor .line-nums::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-right: 1px solid currentColor;
  opacity: 0.5;
}
.code-editor .header.border::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background: currentColor;
  opacity: 0.15;
}
</style>
