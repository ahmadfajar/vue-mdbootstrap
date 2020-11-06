<template>
  <div class="md-grid-toolbar" role="toolbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsGridToolbar"
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-grid {
    > .#{$prefix}-grid-toolbar {
        border-bottom: 1px solid darken($table-border-color, 10%);
        padding: $padding-sm $padding-base;
        position: relative;
    }
}

.card {
    > .#{$prefix}-grid {
        > .#{$prefix}-grid-toolbar {
            background-color: $table-header-bgcolor;
        }

        &:first-child {
            > .#{$prefix}-grid-toolbar {
                padding: $padding-sm;
            }
        }
    }

    .card-body {
        .#{$prefix}-grid {
            > .#{$prefix}-grid-toolbar {
                border-bottom: 0 none;
                margin-bottom: $padding-base + .15;
                padding: 0;
            }
        }
    }
}
</style>
