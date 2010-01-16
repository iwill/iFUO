# Autogenerated from a Treetop grammar. Edits may be lost.


module Mail
  module ContentDisposition
    include Treetop::Runtime

    def root
      @root ||= :content_disposition
    end

    include RFC2822

    include RFC2045

    module ContentDisposition0
      def CFWS1
        elements[0]
      end

      def parameter
        elements[2]
      end

      def CFWS2
        elements[3]
      end
    end

    module ContentDisposition1
      def disposition_type
        elements[0]
      end

      def param_hashes
        elements[1]
      end
    end

    module ContentDisposition2
      def parameters
        param_hashes.elements.map do |param|
          param.parameter.param_hash
        end
      end
    end

    def _nt_content_disposition
      start_index = index
      if node_cache[:content_disposition].has_key?(index)
        cached = node_cache[:content_disposition][index]
        @index = cached.interval.end if cached
        return cached
      end

      i0, s0 = index, []
      r1 = _nt_disposition_type
      s0 << r1
      if r1
        s2, i2 = [], index
        loop do
          i3, s3 = index, []
          r4 = _nt_CFWS
          s3 << r4
          if r4
            if has_terminal?(";", false, index)
              r5 = instantiate_node(SyntaxNode,input, index...(index + 1))
              @index += 1
            else
              terminal_parse_failure(";")
              r5 = nil
            end
            s3 << r5
            if r5
              r6 = _nt_parameter
              s3 << r6
              if r6
                r7 = _nt_CFWS
                s3 << r7
              end
            end
          end
          if s3.last
            r3 = instantiate_node(SyntaxNode,input, i3...index, s3)
            r3.extend(ContentDisposition0)
          else
            @index = i3
            r3 = nil
          end
          if r3
            s2 << r3
          else
            break
          end
        end
        r2 = instantiate_node(SyntaxNode,input, i2...index, s2)
        s0 << r2
      end
      if s0.last
        r0 = instantiate_node(SyntaxNode,input, i0...index, s0)
        r0.extend(ContentDisposition1)
        r0.extend(ContentDisposition2)
      else
        @index = i0
        r0 = nil
      end

      node_cache[:content_disposition][start_index] = r0

      r0
    end

    def _nt_disposition_type
      start_index = index
      if node_cache[:disposition_type].has_key?(index)
        cached = node_cache[:disposition_type][index]
        @index = cached.interval.end if cached
        return cached
      end

      i0 = index
      if has_terminal?("inline", false, index)
        r1 = instantiate_node(SyntaxNode,input, index...(index + 6))
        @index += 6
      else
        terminal_parse_failure("inline")
        r1 = nil
      end
      if r1
        r0 = r1
      else
        if has_terminal?("attachment", false, index)
          r2 = instantiate_node(SyntaxNode,input, index...(index + 10))
          @index += 10
        else
          terminal_parse_failure("attachment")
          r2 = nil
        end
        if r2
          r0 = r2
        else
          r3 = _nt_extension_token
          if r3
            r0 = r3
          else
            if has_terminal?('', false, index)
              r4 = instantiate_node(SyntaxNode,input, index...(index + 0))
              @index += 0
            else
              terminal_parse_failure('')
              r4 = nil
            end
            if r4
              r0 = r4
            else
              @index = i0
              r0 = nil
            end
          end
        end
      end

      node_cache[:disposition_type][start_index] = r0

      r0
    end

    def _nt_extension_token
      start_index = index
      if node_cache[:extension_token].has_key?(index)
        cached = node_cache[:extension_token][index]
        @index = cached.interval.end if cached
        return cached
      end

      i0 = index
      r1 = _nt_ietf_token
      if r1
        r0 = r1
      else
        r2 = _nt_x_token
        if r2
          r0 = r2
        else
          @index = i0
          r0 = nil
        end
      end

      node_cache[:extension_token][start_index] = r0

      r0
    end

    module Parameter0
      def attr
        elements[1]
      end

      def val
        elements[3]
      end

    end

    module Parameter1
      def param_hash
        {attr.text_value => val.text_value}
      end
    end

    def _nt_parameter
      start_index = index
      if node_cache[:parameter].has_key?(index)
        cached = node_cache[:parameter][index]
        @index = cached.interval.end if cached
        return cached
      end

      i0, s0 = index, []
      r2 = _nt_CFWS
      if r2
        r1 = r2
      else
        r1 = instantiate_node(SyntaxNode,input, index...index)
      end
      s0 << r1
      if r1
        r3 = _nt_attribute
        s0 << r3
        if r3
          if has_terminal?("=", false, index)
            r4 = instantiate_node(SyntaxNode,input, index...(index + 1))
            @index += 1
          else
            terminal_parse_failure("=")
            r4 = nil
          end
          s0 << r4
          if r4
            r5 = _nt_value
            s0 << r5
            if r5
              r7 = _nt_CFWS
              if r7
                r6 = r7
              else
                r6 = instantiate_node(SyntaxNode,input, index...index)
              end
              s0 << r6
            end
          end
        end
      end
      if s0.last
        r0 = instantiate_node(SyntaxNode,input, i0...index, s0)
        r0.extend(Parameter0)
        r0.extend(Parameter1)
      else
        @index = i0
        r0 = nil
      end

      node_cache[:parameter][start_index] = r0

      r0
    end

    def _nt_attribute
      start_index = index
      if node_cache[:attribute].has_key?(index)
        cached = node_cache[:attribute][index]
        @index = cached.interval.end if cached
        return cached
      end

      s0, i0 = [], index
      loop do
        r1 = _nt_token
        if r1
          s0 << r1
        else
          break
        end
      end
      if s0.empty?
        @index = i0
        r0 = nil
      else
        r0 = instantiate_node(SyntaxNode,input, i0...index, s0)
      end

      node_cache[:attribute][start_index] = r0

      r0
    end

    module Value0
      def text_value
        quoted_content.text_value
      end
    end

    def _nt_value
      start_index = index
      if node_cache[:value].has_key?(index)
        cached = node_cache[:value][index]
        @index = cached.interval.end if cached
        return cached
      end

      i0 = index
      r1 = _nt_quoted_string
      r1.extend(Value0)
      if r1
        r0 = r1
      else
        s2, i2 = [], index
        loop do
          i3 = index
          r4 = _nt_token
          if r4
            r3 = r4
          else
            if has_terminal?('\G[\\x3d]', true, index)
              r5 = true
              @index += 1
            else
              r5 = nil
            end
            if r5
              r3 = r5
            else
              @index = i3
              r3 = nil
            end
          end
          if r3
            s2 << r3
          else
            break
          end
        end
        if s2.empty?
          @index = i2
          r2 = nil
        else
          r2 = instantiate_node(SyntaxNode,input, i2...index, s2)
        end
        if r2
          r0 = r2
        else
          @index = i0
          r0 = nil
        end
      end

      node_cache[:value][start_index] = r0

      r0
    end

  end

  class ContentDispositionParser < Treetop::Runtime::CompiledParser
    include ContentDisposition
  end

end
